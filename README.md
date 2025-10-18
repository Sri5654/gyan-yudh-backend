# Gyan Yudh Backend

Backend API for Gyan Yudh - A gamified learning platform for B.Tech students.

## 🚀 Features

- **Authentication**: JWT-based user authentication and authorization
- **User Management**: User profiles, XP tracking, team associations
- **Team System**: Team creation, member management, rankings
- **Quest System**: Coding challenges, quizzes, and learning activities
- **Leaderboard**: Real-time rankings and competition tracking
- **Security**: Password hashing, CORS protection, input validation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, CORS
- **Environment**: dotenv for configuration

## 📁 Project Structure

```
gyan-yudh-backend/
├── models/           # MongoDB models (User, Team, Quest)
├── routes/           # API routes
├── middleware/       # Authentication middleware
├── server.js         # Express server setup
├── seedData.js       # Database seeding script
├── package.json      # Dependencies and scripts
└── Procfile         # Render deployment config
```

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sri5654/gyan-yudh-backend.git
   cd gyan-yudh-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your values:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gyan-yudh
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

4. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/status` - Update user status
- `POST /api/users/complete-quest` - Complete a quest

### Teams
- `GET /api/teams/:teamId` - Get team details
- `GET /api/teams/top/5` - Get top 5 teams

### Quests
- `GET /api/quests/daily` - Get daily quests
- `GET /api/quests/type/:type` - Get quests by type
- `GET /api/quests/:questId` - Get specific quest

### Leaderboard
- `GET /api/leaderboard` - Get team rankings

## 🌐 Deployment

### Render Deployment
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with these settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

### Environment Variables for Production
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gyan-yudh
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **CORS Protection**: Configured for frontend domain
- **Input Validation**: Mongoose schema validation
- **Environment Variables**: Sensitive data protection

## 📊 Database Models

### User Model
- Profile information (name, email, avatar)
- XP tracking and daily goals
- Team associations
- Quest completion history
- Power-ups and achievements

### Team Model
- Team information and statistics
- Member management
- Rankings and XP totals
- Project completion tracking

### Quest Model
- Challenge details and content
- Difficulty levels and XP rewards
- Multiple quest types (coding, quiz, review, debug)
- Test cases and validation

## 🚀 Getting Started

1. **Set up MongoDB Atlas** (free tier available)
2. **Deploy to Render** using this repository
3. **Configure environment variables**
4. **Connect with frontend** application

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.

---

**Built for B.Tech students to gamify their learning journey! 🎮📚**