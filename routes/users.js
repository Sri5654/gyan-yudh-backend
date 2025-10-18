const express = require('express');
const User = require('../models/User');
const Team = require('../models/Team');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('teamId');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user status
router.put('/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { status },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete quest
router.post('/complete-quest', auth, async (req, res) => {
  try {
    const { questId, xpEarned } = req.body;
    
    const user = await User.findById(req.userId);
    user.xp += xpEarned;
    user.dailyProgress += xpEarned;
    user.completedQuests.push({
      questId,
      completedAt: new Date(),
      xpEarned
    });

    await user.save();

    // Update team XP
    const team = await Team.findById(user.teamId);
    team.totalXP += xpEarned;
    team.weeklyXP += xpEarned;
    await team.save();

    res.json({ message: 'Quest completed successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;