import User from '../models/User.js';
export const getAllUsers = async (req, res) => {
    try {
        const user = req.user;
        let query = {};
        if (user.role !== 'superadmin') {
            query = {
                $or: [
                    { role: 'member' },
                    { _id: user._id }
                ]
            };
        }
        const users = await User.find(query).select('-password');
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: { users },
        });
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
export const deleteUser = async (req, res) => {
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
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { name, email, role, active } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, role, active }, { new: true, runValidators: true });
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
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};
//# sourceMappingURL=userController.js.map