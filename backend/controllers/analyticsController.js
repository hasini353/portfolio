const Analytics = require('../models/Analytics');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Message = require('../models/Message');

exports.getAnalytics = async (req, res) => {
  try {
    const records = await Analytics.find({});
    const analytics = records[0] || { pageViews: 0, uniqueVisitors: 0, dailyHits: [] };

    const projectCount = await Project.countDocuments({});
    const blogCount = await Blog.countDocuments({});
    const messageCount = await Message.countDocuments({});

    res.json({
      pageViews: analytics.pageViews,
      uniqueVisitors: analytics.uniqueVisitors,
      dailyHits: analytics.dailyHits || [],
      counts: {
        projects: projectCount,
        blogs: blogCount,
        messages: messageCount
      }
    });
  } catch (err) {
    console.error('Fetch analytics error:', err.message);
    res.status(500).send('Server error');
  }
};
