import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
dotenv.config();
const app = express();
// Railway dynamic port
const PORT = Number(process.env.PORT) || 5000;
// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(helmet());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
// Health Check Route
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});
// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing in environment variables');
    process.exit(1);
}
// Connect MongoDB
mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => {
    console.log('✅ Connected to MongoDB');
    // Start Server
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
});
//# sourceMappingURL=index.js.map