import Notification from '../models/Notification.js';
export const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user._id })
            .sort('-createdAt')
            .populate('sender', 'name avatar');
        res.status(200).json({
            status: 'success',
            data: { notifications }
        });
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
export const markAsRead = async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
        res.status(200).json({ status: 'success' });
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ recipient: req.user._id }, { isRead: true });
        res.status(200).json({ status: 'success' });
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
//# sourceMappingURL=notificationController.js.map