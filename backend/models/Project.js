const mongoose = require('mongoose');
const { getModelWrapper } = require('../config/db');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // Full Stack, Backend, Cloud, AI/ML, etc.
  githubLink: { type: String, default: '' },
  demoLink: { type: String, default: '' },
  metrics: { type: Object, default: {} }, // e.g., { latencyReduction: "25%", usersHandled: "10K+" }
  tags: [{ type: String }],
  caseStudy: {
    overview: { type: String, default: '' },
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    features: [{ type: String }],
    challenges: { type: String, default: '' },
    learnings: { type: String, default: '' },
    futureImprovements: [{ type: String }]
  },
  diagrams: {
    system: { type: String, default: '' },    // SVG or description of system architecture
    schema: { type: String, default: '' },    // SVG or description of database schema
    apiFlow: { type: String, default: '' },   // SVG or description of API flow
    deployment: { type: String, default: '' } // SVG or description of deployment
  },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const MongooseProject = mongoose.model('Project', projectSchema);
module.exports = getModelWrapper('Project', MongooseProject);
