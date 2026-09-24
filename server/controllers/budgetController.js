import { GoogleGenAI } from '@google/genai';
import mongoose from 'mongoose';
import axios from 'axios';
import Budget from '../models/Budget.js';


const geminiai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Realistic Indian daily baseline rates (INR)
const COST_MULTIPLIERS = {
    accommodation: {
        hostel: 800,           // Hostels / dorms (Zostel, etc.)
        "budget-hotel": 1800,  // Standard budget stays / guesthouses
        "mid-range": 3500,     // 3-star / comfortable business hotels
        boutique: 6000,        // Heritage stays / boutique resorts
        luxury: 12000,         // 5-star / luxury resort properties
        airbnb: 3000,          // Homestays / serviced apartments
    },
    food: {
        "street-food": 350,    // Local dhabas / street stalls per day
        casual: 800,           // Cafes / casual sit-downs per day
        mix: 1200,             // Balanced mix of street and casual dining
        restaurants: 2000,     // Full-service family restaurants
        "fine-dining": 4500,   // Premium dining / luxury property restaurants
    },
};
const SEASON_FACTORS = { peak: 1.3, summer: 1.2, winter: 1.3, monsoon: 0.75, shoulder: 1.0, "off-peak": 0.75 };

// Function for budget calcutaion
const calculateBudget = async (req, res) => {
    try {
        // 1. Guard check for authenticated user
        if (!req.user?._id) {
            return res.status(401).json({ error: "Authentication required to calculate budget" });
        }

        // 2. Destructure inputs
        const { destination, inputs = {} } = req.body;

        if (!destination) {
            return res.status(400).json({ error: "Destination is required" });
        }

        const duration = Math.max(1, parseInt(inputs.duration, 10) || 1);
        const numTravelers = Math.max(1, parseInt(inputs.numTravelers, 10) || 1);
        const accommodationType = inputs.accommodationType || inputs.accomodationType || "mid-range";
        const dailyFoodPreference = inputs.dailyFoodPreference || "mix";
        const travelSeason = inputs.travelSeason || "shoulder";
        const userCurrency = (inputs.userCurrency || "INR").toUpperCase();

        // 3. Exchange rate logic: Base currency is INR
        let exchangeRate = 1;
        if (userCurrency !== "INR") {
            try {
                // Fetch rates with INR as the baseline
                const rateRes = await axios.get("https://open.er-api.com/v6/latest/INR", { timeout: 4000 });

                const data = rateRes && rateRes.data;
                const rates = data && data.rates;

                if (rates && rates[userCurrency]) {
                    exchangeRate = rates[userCurrency];
                }
            } catch (e) {
                console.warn("Currency API failed, defaulting exchange rate to 1.0 (INR)");
            }
        }

        // 4. Calculate adjusted base costs
        const seasonMult = SEASON_FACTORS[travelSeason] || 1.0;
        const baseAccommodation = (COST_MULTIPLIERS.accommodation[accommodationType] || 3500) * seasonMult;
        const baseFood = (COST_MULTIPLIERS.food[dailyFoodPreference] || 1200) * seasonMult;

        // 5. Cost breakdown in target currency
        // Transport: ~600/day/traveler (autos, cabs, metro)
        // Insurance: ~150/day/traveler (standard domestic travel cover)
        const breakdown = {
            accommodation: Math.round(baseAccommodation * duration * exchangeRate),
            food: Math.round(baseFood * duration * numTravelers * exchangeRate),
            transport: Math.round(600 * duration * numTravelers * exchangeRate),
            insurance: Math.round(150 * duration * numTravelers * exchangeRate),
        };

        const subtotal = Object.values(breakdown).reduce((a, b) => a + b, 0);
        const miscellaneous = Math.round(subtotal * 0.10);
        const emergencyBuffer = Math.round((subtotal + miscellaneous) * 0.15);
        const total = subtotal + miscellaneous + emergencyBuffer;
        const perPerson = Math.round(total / numTravelers);

        // 6. Save document to MongoDB
        const budget = await Budget.create({
            userId: req.user._id,
            destination,
            currency: userCurrency,
            inputs: { ...inputs, duration, numTravelers, accommodationType, travelSeason, dailyFoodPreference, userCurrency },
            breakdown: { ...breakdown, miscellaneous, emergencyBuffer, total, perPerson },
        });

        return res.status(201).json({
            status: "success",
            budget,
            exchangeRateUsed: exchangeRate,
        });
    } catch (error) {
        console.error("Budget Calculation Error:", error);
        return res.status(500).json({ error: "Budget calculation failed", details: error.message });
    }
};

// Function for getting history
const getHistory = async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(50);

        return res.status(200).json({
            status: "success",
            count: budgets.length,
            budgets
        });
    } catch (error) {
        console.error("Fetch Budget History Error:", error);
        return res.status(500).json({ error: "Failed to retrieve budget history" });
    }
};

const getAIInsights = async (req, res) => {
    try {
        const { budgetId } = req.body;

        if (!budgetId) {
            return res.status(400).json({ error: "Budget ID required" });
        }

        if (!mongoose.Types.ObjectId.isValid(budgetId)) {
            return res.status(400).json({ error: "Invalid Budget ID format" });
        }

        const budget = await Budget.findOne({
            _id: budgetId,
            userId: req.user._id,
        });

        if (!budget) {
            return res.status(404).json({ error: "Budget Record not found" });
        }

        const prompt = `Travel Budget Auditor: Analyze this trip to ${budget.destination}.
            Total Budget: ${budget.breakdown.total} ${budget.currency}.
            Duration: ${budget.inputs.duration} days.
            Travellers: ${budget.inputs.numTravelers}.
            Accommodation Type: ${budget.inputs.accommodationType}.
            Food Preference: ${budget.inputs.dailyFoodPreference}.`;

        // Call Gemini API with strict structured output schema
        const response = await geminiai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt,
            config: {
                systemInstruction: 'You are a senior travel financial consultant. Analyze the budget, provide money saving tips, highlight hidden costs, and give typical local price examples in standard text format.',
                responseMimeType: 'application/json',
                responseSchema: {
                    type: 'OBJECT',
                    properties: {
                        verdict: { type: 'STRING' },
                        moneySavingTips: {
                            type: 'ARRAY',
                            items: { type: 'STRING' },
                        },
                        hiddenCosts: {
                            type: 'ARRAY',
                            items: { type: 'STRING' },
                        },
                        localPriceExample: { type: 'STRING' },
                    },
                    required: ['verdict', 'moneySavingTips', 'hiddenCosts', 'localPriceExample'],
                },
            },
        });

        // 5. Safely parse LLM JSON
        let aiInsights;
        try {
            aiInsights = JSON.parse(response.text);
        } catch (parseError) {
            console.error('Failed to parse Gemini output:', response.text);
            return res.status(502).json({ message: 'Invalid data format received from AI model' });
        }

        // budget.aiInsights = {
        //     verdict: aiInsights.verdict,
        //     moneySavingTips: aiInsights.moneySavingTips,
        //     hiddenCosts: aiInsights.hiddenCosts,
        //     localPriceExample: aiInsights.localPriceExample,
        // }

        // Update the document using the correct schema key name 'aiInsights'
        const updatedBudget = await Budget.findOneAndUpdate(
            { _id: budgetId, userId: req.user._id },
            { aiInsights },
            { returnDocument: 'after' }
        );

        return res.status(200).json({
            status: "success",
            aiInsights: updatedBudget.aiInsights,
        });

    } catch (error) {
        console.error("AI Insights Error:", error.message);

        // Check if error is an upstream overload (503 / 429)
        if (error.message?.includes('503') || error.message?.includes('UNAVAILABLE')) {
            return res.status(503).json({
                error: "AI service is currently at peak capacity. Please retry in a few seconds.",
            });
        }

        return res.status(500).json({ error: "Failed to generate AI insights", details: error.message });
    }
}

export default {
    calculateBudget,
    getHistory,
    getAIInsights
};