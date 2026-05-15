import mongoose from 'mongoose';
declare const Notification: mongoose.Model<{
    type: "task_completed" | "task_approved" | "task_assigned";
    message: string;
    title: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
    link?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: "task_completed" | "task_approved" | "task_assigned";
    message: string;
    title: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
    link?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    type: "task_completed" | "task_approved" | "task_assigned";
    message: string;
    title: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
    link?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type: "task_completed" | "task_approved" | "task_assigned";
    message: string;
    title: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
    link?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: "task_completed" | "task_approved" | "task_assigned";
    message: string;
    title: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
    link?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & mongoose.FlatRecord<{
    type: "task_completed" | "task_approved" | "task_assigned";
    message: string;
    title: string;
    recipient: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    isRead: boolean;
    link?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Notification;
//# sourceMappingURL=Notification.d.ts.map