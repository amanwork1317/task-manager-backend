import express from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/authController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', protect, restrictTo('admin'), register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

export default router;
