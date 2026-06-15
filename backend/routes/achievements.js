const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const auth = require('../middleware/auth');

router.get('/', achievementController.getAllAchievements);
router.post('/', auth, achievementController.createAchievement);
router.delete('/:id', auth, achievementController.deleteAchievement);

module.exports = router;
