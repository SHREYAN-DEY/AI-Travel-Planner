import express from 'express';
import tripController from '../controllers/tripController.js';
import authMiddleware from '../middleware/authMw.js';
import { body, validationResult } from 'express-validator';
import rateLimiter from 'express-rate-limit';


const router = express.Router();

// protect your gemini API wallet
const aiLimiter = rateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hr
    max: 20, // limit each IP to 20 requests per windowMs
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
const generateValidator = [
    body('destination').notEmpty().withMessage('Destination is required').trim(),
    body('inputs.numTravelers').isInt({ min: 1 }).withMessage('Must have at least 1 traveler'),
    body('inputs.travelStyle').notEmpty().withMessage('Travel style is required'),
    body('inputs.interests').isArray({ min: 1 }).withMessage('Please select at least one interest'),
];

// Get the shared trip by id
router.get("/share/:shareId", tripController.getSharedTrip);

// Protecting Routes for all routes[Require JWT token]
router.use(authMiddleware);

// Protected route so req.user is available
router.post('/generate', aiLimiter, generateValidator, validate, tripController.generateTrip);
router.get('/history', tripController.getTripHistory);
router.get('/:id', tripController.getTripById);
router.patch('/:id/share', tripController.toggleShare);
router.delete('/:id', tripController.deleteTrip);



export default router;