import mongoose from 'mongoose';
import { GoogleGenAI } from '@google/genai';
import { v4 as uuidv4 } from 'uuid';
import Trip from '../models/Trip.js';

const geminiai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generate personalizes trip according to user need
const generateTrip = async (req, res) => {
    try {
        // 1. Ensure user is authenticated
        if (!req.user?._id) {
            return res.status(401).json({ message: 'Authentication required to generate a trip' });
        }


        // 2. Declear all the variables, constants and take input from the frontend
        const { destination, inputs = {} } = req.body;
        if (!destination) {
            return res.status(400).json({ message: 'Destination is required' });
        }

        const duration = parseInt(inputs.duration) || 3;
        const travellers = parseInt(inputs.numTravelers) || 1;
        const travelStyle = inputs.travelStyle || 'Standard';

        let interests;
        if (Array.isArray(inputs.interests)) {
            interests = inputs.interests.join(', ');
        } else {
            interests = 'general sightseeing';
        }

        let budget;
        if (inputs.budgetMin && inputs.budgetMax) {
            budget = `${inputs.budgetMin} to ${inputs.budgetMax}`;
        } else {
            budget = 'moderate';
        }


        // 3. Build prompt including all user preferences
        const prompt = `Create a travel itinerary for ${destination} for ${duration} days with ${travellers} traveler(s).
        Travel Style: ${travelStyle}
        Interests: ${interests}
        Budget: ${budget}

        Respond ONLY in valid JSON matching this exact structure:
        {
            "itinerary": {
                "days": [
                    {
                        "day": 1,
                        "theme": "Theme Title",
                        "neighborhood": "Area Name",
                        "estimatedDailyCost": 150,
                        "morning": { "activity": "...", "description": "...", "location": "...", "estimatedCost": 20, "tips": "..." },
                        "afternoon": { "activity": "...", "description": "...", "location": "...", "estimatedCost": 50, "tips": "..." },
                        "evening": { "activity": "...", "description": "...", "location": "...", "estimatedCost": 80, "tips": "..." }
                    }
                ]
            },
            "insights": [
                { "title": "Local Secret", "content": "..." }
            ],
            "packingList": {
                "essentials": ["Passport"],
                "clothing": ["Jackets"],
                "gear": ["Camera"],
                "documents": ["Insurance"]
            }
        }`;

        // 4. Call Gemini API
        const response = await geminiai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt,
            config: {
                systemInstruction: 'You are an expert travel planner. Always return strict, valid JSON.',
                responseMimeType: 'application/json',
            },
        });

        // 5. Safely parse LLM JSON
        let tripData;
        try {
            tripData = JSON.parse(response.text);
        } catch (parseError) {
            console.error('Failed to parse Gemini output:', response.text);
            return res.status(502).json({ message: 'Invalid data format received from AI model' });
        }

        // 6. Persist trip to database
        const newTrip = await Trip.create({
            userId: req.user._id,
            destination,
            input: {
                ...inputs,
                duration,
                numTravelers: travellers,
            },
            itinerary: tripData,
            shareId: uuidv4(),
        });

        return res.status(201).json({
            status: 'success',
            trip: newTrip || [],
        });

    } catch (error) {
        console.error('Trip Generation Error:', error);
        return res.status(400).json({ message: 'Failed to generate trip', error: error.message });
    }
};

// Get trip history for authenticated user (token)
const getTripHistory = async (req, res) => {
    try {
        const trips = await Trip.find({
            userId: new mongoose.Types.ObjectId(req.user._id),
        })
        res.json({ trips: trips });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve trip history', error: error.message });
    }
}

// Get trip by ID for authenticated user (token)
const getTripById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid trip ID format' });
        }

        const trip = await Trip.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json({ status: 'success', trip });
    } catch (error) {
        console.error('Error fetching trip by ID:', error);
        return res.status(500).json({ message: 'Failed to retrieve trip', error: error.message });
    }
};

// Let user share travel itinerary
const toggleShare = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid trip ID format' });
        }

        const trip = await Trip.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        trip.isPublic = !trip.isPublic;
        if (!trip.shareId) {
            trip.shareId = uuidv4();
        }

        await trip.save();

        return res.status(200).json({ status: 'success', isPublic: trip.isPublic, shareId: trip.shareId, });
    } catch (error) {
        console.error('Error toggling share status:', error);
        return res.status(500).json({ message: 'Failed to update share status', error: error.message });
    }
};

// Delete a trip by ID for the authenticated user
const deleteTrip = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid trip ID format' });
        }

        const trip = await Trip.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found or unauthorized' });
        }

        return res.status(200).json({ status: 'success', message: 'Trip deleted successfully' });
    } catch (error) {
        console.error('Error deleting trip:', error);
        return res.status(500).json({ message: 'Failed to delete trip', error: error.message });
    }
};

// Share anyone by ID
const getSharedTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            shareId: req.params.shareId,
            isPublic: true,
        });

        if(!trip){
            return res.status(404).json({error: "This trip is either private or does not exist"});
        }
        return res.status(200).json({ status: 'success', trip });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve shared trip', error: error.message });
    }
};



export default {
    generateTrip,
    getTripHistory,
    getTripById,
    toggleShare,
    deleteTrip,
    getSharedTrip
};