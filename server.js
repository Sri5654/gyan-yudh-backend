const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Mock data for testing without database
const mockUsers = [
  { id: '1', name: 'Demo User', email: 'demo@example.com', teamId: '1', xp: 1250 }
];

const mockTeams = [
  { _id: '1', name: 'The Segfault Squad', totalXP: 2847, weeklyXP: 980, rank: 2, members: ['1'] },
  { _id: '2', name: 'Code Crusaders', totalXP: 4250, weeklyXP: 1200, rank: 1, members: [] },
  { _id: '3', name: 'Binary Beasts', totalXP: 3654, weeklyXP: 875, rank: 3, members: [] }
];

const mockQuests = [
  {
    _id: '1',
    title: 'Mastering Pointers in C',
    subject: 'C Programming',
    difficulty: 'Medium',
    xpReward: 75,
    type: 'coding',
    icon: 'code'
  },
  {
    _id: '2',
    title: 'Binary Search Tree Implementation',
    subject: 'Data Structures',
    difficulty: 'Hard',
    xpReward: 100,
    type: 'coding',
    icon: 'tree'
  },
  {
    _id: '3',
    title: 'Data Science with Pandas',
    subject: 'Data Science',
    difficulty: 'Easy',
    xpReward: 120,
    type: 'coding',
    icon: 'chart'
  }
];

// Mock Routes (no database required)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email && password) {
    res.json({
      token: 'mock-jwt-token-' + Date.now(),
      user: { id: '1', name: 'Demo User', email: email }
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, teamName } = req.body;
  
  if (name && email && password && teamName) {
    res.json({
      token: 'mock-jwt-token-' + Date.now(),
      user: { id: '1', name: name, email: email }
    });
  } else {
    res.status(400).json({ message: 'Missing required fields' });
  }
});

app.get('/api/users/profile', (req, res) => {
  res.json({
    _id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    teamId: { _id: '1', name: 'The Segfault Squad' },
    xp: 1250,
    dailyGoal: 100,
    dailyProgress: 75,
    avatar: 'https://via.placeholder.com/100x100/1a1a2e/00d2ff?text=DU',
    powerUps: [
      { name: 'Double XP', active: true, expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) }
    ]
  });
});

app.get('/api/teams/top/5', (req, res) => {
  res.json(mockTeams.slice(0, 5));
});

app.get('/api/teams/:teamId', (req, res) => {
  const team = mockTeams.find(t => t._id === req.params.teamId);
  if (team) {
    res.json(team);
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
});

app.get('/api/quests/daily', (req, res) => {
  res.json(mockQuests);
});

app.get('/api/quests/type/:type', (req, res) => {
  const filtered = mockQuests.filter(q => q.type === req.params.type);
  res.json(filtered);
});

app.get('/api/leaderboard', (req, res) => {
  const { filter = 'all' } = req.query;
  
  let sortedTeams = [...mockTeams];
  if (filter === 'week') {
    sortedTeams.sort((a, b) => b.weeklyXP - a.weeklyXP);
  } else {
    sortedTeams.sort((a, b) => b.totalXP - a.totalXP);
  }
  
  res.json(sortedTeams.map((team, index) => ({
    ...team,
    rank: index + 1
  })));
});

app.post('/api/users/complete-quest', (req, res) => {
  const { questId, xpEarned } = req.body;
  res.json({ 
    message: 'Quest completed successfully', 
    xpEarned: xpEarned || 50 
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Gyan Yudh Backend is running!', 
    timestamp: new Date().toISOString(),
    mode: 'mock-data',
    database: 'not-connected'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Gyan Yudh Backend API',
    version: '1.0.0',
    mode: 'mock-data',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      users: '/api/users/*',
      teams: '/api/teams/*',
      quests: '/api/quests/*',
      leaderboard: '/api/leaderboard'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Gyan Yudh Backend running on port ${PORT}`);
  console.log(`📊 Mode: Mock Data (No Database Required)`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health`);
});