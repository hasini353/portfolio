const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    // Simple search filter
    const query = req.query.search;
    const category = req.query.category;
    let filtered = [...blogs];

    if (query) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(query.toLowerCase()) || 
        blog.content.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(blog => blog.category === category);
    }

    // Sort by creation date descending
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(filtered);
  } catch (err) {
    console.error('Fetch blogs error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found.' });
    }

    // Increment views
    const updated = await Blog.findByIdAndUpdate(blog._id, { views: (blog.views || 0) + 1 }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Fetch single blog error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags } = req.body;
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    // Check if slug is unique
    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(400).json({ msg: 'A blog with a similar title already exists.' });
    }

    const newBlog = await Blog.create({
      title,
      content,
      excerpt,
      category,
      tags,
      slug,
      views: 0
    });
    res.status(201).json(newBlog);
  } catch (err) {
    console.error('Create blog error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ msg: 'Blog not found.' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Update blog error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Blog not found.' });
    }
    res.json({ msg: 'Blog deleted successfully.' });
  } catch (err) {
    console.error('Delete blog error:', err.message);
    res.status(500).send('Server error');
  }
};
