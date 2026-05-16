import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address',
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false,
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'member'],
        default: 'member',
    },
    active: {
        type: Boolean,
        default: true,
    },
    avatar: {
        type: String,
        default: '',
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true,
});
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=User.js.map