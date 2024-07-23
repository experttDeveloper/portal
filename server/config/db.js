const mongoose = require('mongoose');

// MongoDB connection URL
const databaseUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/deep_cafe';

// Connect to MongoDB
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Error handling
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Connection established
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db;
