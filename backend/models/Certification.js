const mongoose = require('mongoose');
const { getModelWrapper } = require('../config/db');

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true }, // e.g. "July 2025"
  credentialLink: { type: String, default: '' },
  skillsLearned: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const MongooseCertification = mongoose.model('Certification', certificationSchema);
module.exports = getModelWrapper('Certification', MongooseCertification);
