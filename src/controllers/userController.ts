import type { Request, Response } from 'express';
import User from '../models/User.js';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  } catch (err: any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role, active } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, active },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
