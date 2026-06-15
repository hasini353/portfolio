const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please provide all required fields (name, email, message).' });
  }

  try {
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
      read: false
    });

    // Simulated email notification console log
    console.log(`✉️ Simulated Email Sent to Hasini:
    From: ${name} <${email}>
    Subject: ${subject}
    Message: ${message}`);

    res.status(201).json({ msg: 'Message sent successfully!', message: newMessage });
  } catch (err) {
    console.error('Send message error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    // Sort messages by date descending
    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(messages);
  } catch (err) {
    console.error('Fetch messages error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Message not found.' });
    }
    res.json({ msg: 'Message deleted successfully.' });
  } catch (err) {
    console.error('Delete message error:', err.message);
    res.status(500).send('Server error');
  }
};
