import type { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const getMyNotifications: (req: AuthRequest, res: Response) => Promise<void>;
export declare const markAsRead: (req: AuthRequest, res: Response) => Promise<void>;
export declare const markAllAsRead: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=notificationController.d.ts.map