import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Task from '../models/Task.js';
dotenv.config({ path: '.env' });
const seedData = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI)
            throw new Error('MONGODB_URI is not defined');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        // Clean existing data
        await User.deleteMany({ role: 'member' });
        await Task.deleteMany({});
        console.log('Cleaned existing members and tasks');
        const admin = await User.findOne({ role: 'admin' });
        if (!admin)
            throw new Error('Admin user not found. Please run seedAdmin first.');
        const password = await bcrypt.hash('password123', 12);
        // 1. Create Mock Members
        const members = await User.create([
            { name: 'Sarah Wilson', email: 'sarah@hrms.com', password, role: 'member' },
            { name: 'James Chen', email: 'james@hrms.com', password, role: 'member' },
            { name: 'Elena Rodriguez', email: 'elena@hrms.com', password, role: 'member' },
            { name: 'Marcus Thorne', email: 'marcus@hrms.com', password, role: 'member' },
        ]);
        console.log('Created 4 mock members');
        // 2. Create Mock Tasks
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        await Task.create([
            {
                title: 'Design System Audit',
                description: 'Review and update all UI components for accessibility compliance.',
                status: 'in-progress',
                priority: 'high',
                dueDate: nextWeek,
                assignedTo: members[0]._id,
                createdBy: admin._id
            },
            {
                title: 'API Integration',
                description: 'Connect the frontend task list with the backend CRUD endpoints.',
                status: 'pending',
                priority: 'medium',
                dueDate: nextWeek,
                assignedTo: members[1]._id,
                createdBy: admin._id
            },
            {
                title: 'Unit Testing',
                description: 'Write test cases for the authentication middleware.',
                status: 'completed',
                priority: 'low',
                dueDate: today,
                assignedTo: members[2]._id,
                createdBy: admin._id
            },
            {
                title: 'Database Optimization',
                description: 'Create indexes for the task collection to improve query performance.',
                status: 'pending',
                priority: 'high',
                dueDate: nextWeek,
                assignedTo: members[3]._id,
                createdBy: admin._id
            },
            {
                title: 'Documentation',
                description: 'Update the README and API documentation for the current sprint.',
                status: 'in-progress',
                priority: 'medium',
                dueDate: nextWeek,
                assignedTo: members[0]._id,
                createdBy: admin._id
            }
        ]);
        console.log('Created 5 mock tasks');
        console.log('******************************************');
        console.log('Database seeded successfully!');
        console.log('Admin Email: admin@hrms.com');
        console.log('Member Password: password123');
        console.log('******************************************');
        process.exit(0);
    }
    catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};
seedData();
//# sourceMappingURL=seedData.js.map