import express from 'express';
import { 
  createTask, 
  getAllTasks, 
  updateTask, 
  deleteTask,
  approveTask,
  declineTask 
} from '../controllers/taskController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // Protect all task routes

router.route('/')
  .get(getAllTasks)
  .post(restrictTo('admin'), createTask); // Only admin can create tasks

router.route('/:id')
  .patch(updateTask)
  .delete(restrictTo('admin'), deleteTask); // Only admin can delete tasks

router.patch('/:id/approve', restrictTo('admin'), approveTask);
router.patch('/:id/decline', restrictTo('admin'), declineTask);

export default router;
