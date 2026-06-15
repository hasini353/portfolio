const mongoose = require('mongoose');
const { getModelWrapper } = require('../config/db');

const analyticsSchema = new mongoose.Schema({
  pageViews: { type: Number, default: 0 },
  uniqueVisitors: { type: Number, default: 0 },
  dailyHits: [
    {
      date: { type: String, required: true }, // e.g. "YYYY-MM-DD"
      count: { type: Number, default: 0 }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const MongooseAnalytics = mongoose.model('Analytics', analyticsSchema);
module.exports = getModelWrapper('Analytics', MongooseAnalytics);
