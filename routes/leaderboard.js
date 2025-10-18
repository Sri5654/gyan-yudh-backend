const express = require('express');
const Team = require('../models/Team');
const auth = require('../middleware/auth');

const router = express.Router();

// Get full leaderboard
router.get('/', auth, async (req, res) => {
  try {
    const { filter = 'all' } = req.query;
    let sortField = 'totalXP';
    
    if (filter === 'week') {
      sortField = 'weeklyXP';
    }

    const teams = await Team.find()
      .sort({ [sortField]: -1 })
      .select('name totalXP weeklyXP projectsCompleted');

    // Add rank to each team
    const rankedTeams = teams.map((team, index) => ({
      ...team.toObject(),
      rank: index + 1
    }));

    res.json(rankedTeams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;