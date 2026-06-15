const mongoose = require('mongoose');
const { getModelWrapper } = require('../config/db');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const MongooseMessage = mongoose.model('Message', messageSchema);
module.exports = getModelWrapper('Message', MongooseMessage);
