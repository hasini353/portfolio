const Skill = require('../models/Skill');

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (err) {
    console.error('Fetch skills error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.createSkill = async (req, res) => {
  try {
    const newSkill = await Skill.create(req.body);
    res.status(201).json(newSkill);
  } catch (err) {
    console.error('Create skill error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ msg: 'Skill not found.' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Update skill error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Skill not found.' });
    }
    res.json({ msg: 'Skill deleted successfully.' });
  } catch (err) {
    console.error('Delete skill error:', err.message);
    res.status(500).send('Server error');
  }
};
