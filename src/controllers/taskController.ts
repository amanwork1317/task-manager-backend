import type { Request, Response } from 'express';
import Task from '../models/Task.js';
import Notification from '../models/Notification.js';

interface AuthRequest extends Request {
  user?: any;
}

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
    });

    // Notify the assigned user
    await Notification.create({
      recipient: assignedTo,
      sender: req.user._id,
      type: 'task_assigned',
      title: 'New Task Assigned',
      message: `You have been assigned a new task: ${title}`,
      link: '/tasks'
    });

    res.status(201).json({
      status: 'success',
      data: { task: newTask },
    });
  } catch (err: any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const getAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    let query;
    
    // If admin, get all tasks. If member, get only assigned tasks.
    if (req.user.role === 'admin') {
      query = Task.find().populate('assignedTo', 'name email avatar').populate('createdBy', 'name');
    } else {
      query = Task.find({ assignedTo: req.user._id }).populate('assignedTo', 'name email avatar').populate('createdBy', 'name');
    }

    const tasks = await query;

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: { tasks },
    });
  } catch (err: any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const currentTask = await Task.findById(req.params.id);
    if (!currentTask) {
      return res.status(404).json({ message: 'No task found with that ID' });
    }

    // Protection: Once a task is completed, it's locked for non-admins
    if (currentTask.status === 'completed' && req.user.role !== 'admin') {
      return res.status(403).json({ status: 'fail', message: 'This task is completed and locked.' });
    }

    let updateData = { ...req.body };

    // Approval Workflow: If a member marks a task as 'completed', move it to 'pending-approval' instead
    if (req.user.role !== 'admin' && updateData.status === 'completed') {
      updateData.status = 'pending-approval';
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('assignedTo', 'name email avatar');

    if (!task) return res.status(404).json({ message: 'No task found with that ID' });

    // If status changed to pending-approval, notify admin
    if (updateData.status === 'pending-approval' && currentTask.status !== 'pending-approval') {
      await Notification.create({
        recipient: task.createdBy, // The admin who created it
        sender: req.user._id,
        type: 'task_completed',
        title: 'Task Awaiting Approval',
        message: `${req.user.name} has submitted "${task.title}" for approval.`,
        link: '/'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { task },
    });
  } catch (err: any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const approveTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { 
      status: 'completed' 
    }, { new: true }).populate('assignedTo', 'name email avatar');

    if (!task) return res.status(404).json({ message: 'No task found' });

    // Notify user that task was approved
    await Notification.create({
      recipient: task.assignedTo,
      sender: req.user._id,
      type: 'task_approved',
      title: 'Task Approved!',
      message: `Your task "${task.title}" has been approved by the admin.`,
      link: '/tasks'
    });

    res.status(200).json({ status: 'success', data: { task } });
  } catch (err: any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const declineTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { 
      status: 'pending' 
    }, { new: true }).populate('assignedTo', 'name email avatar');

    if (!task) return res.status(404).json({ message: 'No task found' });

    // Notify user that task was declined
    await Notification.create({
      recipient: task.assignedTo,
      sender: req.user._id,
      type: 'task_assigned',
      title: 'Task Declined',
      message: `Your task "${task.title}" was declined and set back to pending.`,
      link: '/tasks'
    });

    res.status(200).json({ status: 'success', data: { task } });
  } catch (err: any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'No task found with that ID' });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
