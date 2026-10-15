import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMw.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Strict limiter for login & registration to prevent brute-force attacks
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Max 10 attempts per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many authentication attempts. Please try again after 15 minutes.' },
});

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'Error', errors: errors.array() });
    };
    next();
}
const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please use a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('country').notEmpty().withMessage('Country is required'),
];
const loginValidation = [
    body('email').isEmail().withMessage('Please use a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];


// Sensitive endpoints protected by strict rate limit
router.post('/register', authLimiter, registerValidation, validate, authController.register);
router.post('/login', authLimiter, loginValidation, validate, authController.login);

// Session verification & logout bypass the brute-force limiter
router.get('/me', authMiddleware, authController.getMe);
router.post('/logout', authController.logout);




export default router;