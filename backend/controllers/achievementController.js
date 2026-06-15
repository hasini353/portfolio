const Achievement = require('../models/Achievement');

exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({});
    res.json(achievements);
  } catch (err) {
    console.error('Fetch achievements error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.createAchievement = async (req, res) => {
  try {
    const newAchievement = await Achievement.create(req.body);
    res.status(201).json(newAchievement);
  } catch (err) {
    console.error('Create achievement error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const deleted = await Achievement.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Achievement not found.' });
    }
    res.json({ msg: 'Achievement deleted.' });
  } catch (err) {
    console.error('Delete achievement error:', err.message);
    res.status(500).send('Server error');
  }
};
