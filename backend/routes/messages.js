const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post('/contact', messageController.sendMessage);
router.get('/messages', auth, messageController.getAllMessages);
router.delete('/messages/:id', auth, messageController.deleteMessage);

module.exports = router;

