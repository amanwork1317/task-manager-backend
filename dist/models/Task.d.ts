import mongoose from 'mongoose';
declare const Task: mongoose.Model<{
    title: string;
    status: "pending" | "in-progress" | "pending-approval" | "completed";
    priority: "low" | "medium" | "high";
    assignedTo: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    description?: string | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    title: string;
    status: "pending" | "in-progress" | "pending-approval" | "completed";
    priority: "low" | "medium" | "high";
    assignedTo: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    description?: string | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    title: string;
    status: "pending" | "in-progress" | "pending-approval" | "completed";
    priority: "low" | "medium" | "high";
    assignedTo: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    description?: string | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    status: "pending" | "in-progress" | "pending-approval" | "completed";
    priority: "low" | "medium" | "high";
    assignedTo: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    description?: string | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    title: string;
    status: "pending" | "in-progress" | "pending-approval" | "completed";
    priority: "low" | "medium" | "high";
    assignedTo: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    description?: string | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & mongoose.FlatRecord<{
    title: string;
    status: "pending" | "in-progress" | "pending-approval" | "completed";
    priority: "low" | "medium" | "high";
    assignedTo: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    description?: string | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Task;
//# sourceMappingURL=Task.d.ts.map