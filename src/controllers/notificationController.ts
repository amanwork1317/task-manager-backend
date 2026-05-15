import type { Request, Response } from 'express';
import Notification from '../models/Notification.js';

interface AuthRequest extends Request {
  user?: any;
}

export const getMyNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort('-createdAt')
      .populate('sender', 'name avatar');

    res.status(200).json({
      status: 'success',
      data: { notifications }
    });
  } catch (err: any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).json({ status: 'success' });
  } catch (err: any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const markAllAsRead = async (req: AuthRequest, res: Response) => {
  try {
    await Notification.updateMany({ recipient: req.user._id }, { isRead: true });
    res.status(200).json({ status: 'success' });
  } catch (err: any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
