# 🚀 Task Manager - Backend API

The powerful engine behind the Task Manager platform. Built with Node.js, Express, and MongoDB, this API handles secure authentication, real-time task management, and administrative workflows.

## 🛠 Tech Stack
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Security:** JWT, BcryptJS, Helmet, CORS
- **Deployment:** Railway

## 📋 Features
- **Secure Auth:** JWT-based authentication with password hashing.
- **Role-Based Access:** Distinct permissions for `admin` and `member`.
- **Task Pipeline:** End-to-end task lifecycle (Create -> Assign -> Complete -> Approve).
- **Notifications:** Built-in system for task updates and approvals.
- **Admin Tools:** Password resets, team management, and status overrides.

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Run Development
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 🌐 Deployment (Railway)
1. Connect your GitHub repository to **Railway**.
2. Add your environment variables in the Railway Dashboard.
3. Ensure you whitelist `0.0.0.0/0` in MongoDB Atlas to allow Railway to connect.
4. Set the `FRONTEND_URL` to your Netlify address.

---

## 🔒 Security
The API is hardened with:
- **Helmet:** For secure HTTP headers.
- **Rate Limiting:** (Optional/Planned)
- **CORS:** Restrictive origin checks for production.
