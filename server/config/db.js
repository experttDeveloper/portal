const mongoose = require('mongoose');

// MongoDB connection URL\\

const username = "experttdeveloper";
const password = "C2ZkOqM9XEevO9h5";
const database = "portal"

const uri = `mongodb+srv://${username}:${password}@cluster0.fu5kk6v.mongodb.net/${database}`

const databaseUrl = uri || `mongodb://127.0.0.1:27017/${database}`;

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
