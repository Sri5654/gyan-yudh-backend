const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  xp: {
    type: Number,
    default: 0
  },
  dailyGoal: {
    type: Number,
    default: 100
  },
  dailyProgress: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  powerUps: [{
    name: String,
    description: String,
    active: Boolean,
    expiresAt: Date
  }],
  completedQuests: [{
    questId: mongoose.Schema.Types.ObjectId,
    completedAt: Date,
    xpEarned: Number
  }],
  status: {
    type: String,
    enum: ['Online', 'In the Coding Arena', 'Offline'],
    default: 'Offline'
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/100x100/1a1a2e/eee?text=User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);