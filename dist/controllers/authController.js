import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};
export const register = async (req, res) => {
    try {
        const { name, email, password, role, active } = req.body;
        const userRole = req.user?.role;
        const targetRole = role || 'member';
        if (userRole === 'admin' && targetRole !== 'member') {
            return res.status(403).json({ message: 'Admins can only create members' });
        }
        if (userRole === 'superadmin' && targetRole !== 'admin') {
            return res.status(403).json({ message: 'Superadmins can only create admins' });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create user (Role and active can be set by admin)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'member',
            active: active !== undefined ? active : true,
        });
        // Create token
        const token = signToken(newUser._id.toString());
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: {
                    _id: newUser._id,
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    active: newUser.active,
                    createdAt: newUser.createdAt,
                    avatar: newUser.avatar,
                },
            },
        });
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1) Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        // 2) Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        // 3) If everything ok, send token to client
        const token = signToken(user._id.toString());
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'No user found with that email address.' });
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
        await user.save({ validateBeforeSave: false });
        // Mock Email
        console.log(`RESET TOKEN: ${resetToken}`);
        console.log(`RESET URL: http://localhost:3000/reset-password/${resetToken}`);
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email! (Check server console for link)',
        });
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
export const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ status: 'fail', message: 'Token is invalid or has expired.' });
        }
        user.password = await bcrypt.hash(req.body.password, 12);
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await user.save();
        res.status(200).json({
            status: 'success',
            message: 'Password reset successful!',
        });
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
export const updateUserPassword = async (req, res) => {
    try {
        const { password } = req.body;
        if (!password || password.length < 6) {
            return res.status(400).json({ status: 'fail', message: 'Password must be at least 6 characters' });
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }
        user.password = await bcrypt.hash(password, 12);
        await user.save();
        res.status(200).json({
            status: 'success',
            message: 'Password updated successfully!',
        });
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
//# sourceMappingURL=authController.js.map