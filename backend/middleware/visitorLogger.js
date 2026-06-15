const Analytics = require('../models/Analytics');

module.exports = async (req, res, next) => {
  // Skip analytics logging for static admin assets, auth endpoints, or dashboard calls to prevent inflating stats
  if (req.path.startsWith('/auth') || req.path.startsWith('/analytics') || req.path.startsWith('/messages')) {
    return next();
  }

  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Fetch or create analytics report
    const records = await Analytics.find({});
    let record = records[0];

    if (!record) {
      await Analytics.create({
        pageViews: 1,
        uniqueVisitors: 1,
        dailyHits: [{ date: today, count: 1 }]
      });
    } else {
      const dailyHits = record.dailyHits || [];
      const hitsIndex = dailyHits.findIndex(h => h.date === today);
      let updatedHits = [...dailyHits];
      
      if (hitsIndex === -1) {
        updatedHits.push({ date: today, count: 1 });
      } else {
        updatedHits[hitsIndex].count += 1;
      }
      
      // Keep last 30 days of performance records
      if (updatedHits.length > 30) {
        updatedHits.shift();
      }
      
      await Analytics.findByIdAndUpdate(record._id, {
        pageViews: (record.pageViews || 0) + 1,
        dailyHits: updatedHits
      });
    }
  } catch (err) {
    // Fail silently to prevent interrupting actual requests
    console.error('Analytics logging error:', err.message);
  }
  next();
};
