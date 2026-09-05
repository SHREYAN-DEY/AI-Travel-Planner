import express from 'express';
import authController from '../controllers/authController.js';


const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// User must be login
router.get('/me', authController.getMe);

export default router;