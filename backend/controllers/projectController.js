const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    // Sort projects by date created (descending)
    projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(projects);
  } catch (err) {
    console.error('Fetch projects error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found.' });
    }
    res.json(project);
  } catch (err) {
    console.error('Fetch single project error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Create project error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ msg: 'Project not found.' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Update project error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Project not found.' });
    }
    res.json({ msg: 'Project deleted successfully.' });
  } catch (err) {
    console.error('Delete project error:', err.message);
    res.status(500).send('Server error');
  }
};
