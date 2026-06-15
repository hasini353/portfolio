const Certification = require('../models/Certification');

exports.getAllCertifications = async (req, res) => {
  try {
    const certs = await Certification.find({});
    res.json(certs);
  } catch (err) {
    console.error('Fetch certs error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.createCertification = async (req, res) => {
  try {
    const newCert = await Certification.create(req.body);
    res.status(201).json(newCert);
  } catch (err) {
    console.error('Create cert error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteCertification = async (req, res) => {
  try {
    const deleted = await Certification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Certification not found.' });
    }
    res.json({ msg: 'Certification deleted.' });
  } catch (err) {
    console.error('Delete cert error:', err.message);
    res.status(500).send('Server error');
  }
};
