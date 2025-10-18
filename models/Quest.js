const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  xpReward: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['coding', 'quiz', 'review', 'debug'],
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  content: {
    problemStatement: String,
    testCases: [{
      input: String,
      expectedOutput: String
    }],
    questions: [{
      question: String,
      options: [String],
      correctAnswer: Number
    }],
    codeToDebug: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quest', QuestSchema);