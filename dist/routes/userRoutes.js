import express from 'express';
import { getAllUsers, deleteUser, updateUser } from '../controllers/userController.js';
import { updateUserPassword } from '../controllers/authController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
const router = express.Router();
router.use(protect); // All routes protected
router.get('/', getAllUsers);
router.patch('/:id', restrictTo('admin'), updateUser);
router.patch('/:id/reset-password', restrictTo('admin'), updateUserPassword);
router.delete('/:id', restrictTo('admin'), deleteUser);
export default router;
//# sourceMappingURL=userRoutes.js.map