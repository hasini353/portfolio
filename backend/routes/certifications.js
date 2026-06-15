const express = require('express');
const router = express.Router();
const certController = require('../controllers/certController');
const auth = require('../middleware/auth');

router.get('/', certController.getAllCertifications);
router.post('/', auth, certController.createCertification);
router.delete('/:id', auth, certController.deleteCertification);

module.exports = router;
