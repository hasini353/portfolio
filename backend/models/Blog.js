const mongoose = require('mongoose');
const { getModelWrapper } = require('../config/db');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true }, // Markdown support
  excerpt: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const MongooseBlog = mongoose.model('Blog', blogSchema);
module.exports = getModelWrapper('Blog', MongooseBlog);
