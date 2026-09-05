import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMw.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// User must be login
router.get('/me', authMiddleware, authController.getMe);

export default router;