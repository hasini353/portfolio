const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // Sign JWT Token
    const payload = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret_for_dev_hasini',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.verify = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: 'User not found.' });
    }
    res.json({ id: user._id, username: user.username, email: user.email });
  } catch (err) {
    console.error('Verify error:', err.message);
    res.status(500).send('Server error');
  }
};
