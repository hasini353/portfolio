const mongoose = require('mongoose');
const { getModelWrapper } = require('../config/db');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Coding, Academic, Hackathon, Leadership
  date: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const MongooseAchievement = mongoose.model('Achievement', achievementSchema);
module.exports = getModelWrapper('Achievement', MongooseAchievement);
