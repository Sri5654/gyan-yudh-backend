const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  logo: {
    type: String,
    default: 'https://via.placeholder.com/80x80/0f3460/00d2ff?text=Team'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  totalXP: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 0
  },
  winningStreak: {
    type: Number,
    default: 0
  },
  projectsCompleted: {
    type: Number,
    default: 0
  },
  weeklyXP: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);