const express = require('express');
const Quest = require('../models/Quest');
const auth = require('../middleware/auth');

const router = express.Router();

// Get daily quests
router.get('/daily', auth, async (req, res) => {
  try {
    const quests = await Quest.find({ isActive: true }).limit(3);
    res.json(quests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all quests by type
router.get('/type/:type', auth, async (req, res) => {
  try {
    const quests = await Quest.find({ type: req.params.type, isActive: true });
    res.json(quests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quest by ID
router.get('/:questId', auth, async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.questId);
    res.json(quest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;