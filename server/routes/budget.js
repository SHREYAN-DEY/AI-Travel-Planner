import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimiter from 'express-rate-limit';
import budgetController from '../controllers/budgetController.js';
import authMiddleware from '../middleware/authMw.js';


const router = express.Router();


// protect your budget calculation API wallet
const aiLimiter = rateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hr
    max: 15, // limit each IP to 20 requests per windowMs
    message: 'Too many requests from this IP, please try again after an hour',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'Error', errors: errors.array() });
    };
    next();
};
const calValidation = [
    body("destination")
        .notEmpty()
        .withMessage("Destination is required")
        .trim(),

    body("inputs.duration")
        .isInt({ min: 1 })
        .withMessage("Duration must be at least 1 day"),

    body("inputs.numTravelers")
        .optional()
        .isInt({ min: 1 }),

    body("inputs.userCurrency")
        .optional()
        .isString()
        .isLength({ min: 3, max: 3 })
        .withMessage("Currency must be a 3-letter code (e.g., INR)"),

    body("inputs.accommodationType")
        .notEmpty()
        .withMessage("Accommodation type is required"),
];


// Protecting Routes for all routes[Require JWT token]
router.use(authMiddleware);

// Get all history
router.get('/history', budgetController.getHistory);
// Calculate budget
router.post('/calculate', calValidation, validate, budgetController.calculateBudget);
// Get AI Insight
router.post('/ai-insights', aiLimiter, budgetController.getAIInsights);

export default router;