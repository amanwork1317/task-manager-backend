import express from 'express';
import { getAllUsers, deleteUser, updateUser } from '../controllers/userController.js';
import { updateUserPassword } from '../controllers/authController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All routes protected

router.get('/', getAllUsers);
router.patch('/:id', restrictTo('superadmin', 'admin'), updateUser);
router.patch('/:id/reset-password', restrictTo('superadmin', 'admin'), updateUserPassword);
router.delete('/:id', restrictTo('superadmin', 'admin'), deleteUser);

export default router;
