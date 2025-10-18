const express = require('express');
const Team = require('../models/Team');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get team details
router.get('/:teamId', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId).populate('members');
    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get top teams for dashboard
router.get('/top/5', auth, async (req, res) => {
  try {
    const teams = await Team.find()
      .sort({ weeklyXP: -1 })
      .limit(5)
      .select('name weeklyXP');
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;