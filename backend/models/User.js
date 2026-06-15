const mongoose = require('mongoose');
const { getModelWrapper } = require('../config/db');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const MongooseUser = mongoose.model('User', userSchema);
module.exports = getModelWrapper('User', MongooseUser);
