const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = 5000;

// Load environment variables
require('dotenv').config();

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB using the URI from the environment variables
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(`MongoDB connected at ${mongoURI}`))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use(express.json());
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
