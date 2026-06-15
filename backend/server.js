const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const visitorLogger = require('./middleware/visitorLogger');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Track visitor logs on public API requests
app.use('/api', visitorLogger);

// Define API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/certifications', require('./routes/certifications'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/contact', require('./routes/messages'));
app.use('/api/analytics', require('./routes/analytics'));

// API status check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Hasini Gundubogula portfolio backend API is up and running.',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.stack);
  res.status(500).json({ msg: 'Something went wrong on the server.' });
});

const PORT = process.env.PORT || 5000;

// Connect to DB and start listening
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server successfully booted and listening on http://localhost:${PORT}`);
    
    // Self-bootstrapping database seed checker
    try {
      const seed = require('./config/seed');
      seed.checkAndSeed();
    } catch (err) {
      console.error('Auto-seed check failed:', err.message);
    }
  });
};

startServer();
