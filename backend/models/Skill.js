const mongoose = require('mongoose');
const { getModelWrapper } = require('../config/db');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Programming Languages, Frontend, Backend, Databases, Cloud, AI/ML, Tools, System Design
  level: { type: String, default: 'Advanced' }, // level or proficiency indicator
  icon: { type: String, default: 'Terminal' }, // Lucide icon name
  glowColor: { type: String, default: '#00E5FF' }, // Hex color code for customized glowing styling
  createdAt: { type: Date, default: Date.now }
});

const MongooseSkill = mongoose.model('Skill', skillSchema);
module.exports = getModelWrapper('Skill', MongooseSkill);
