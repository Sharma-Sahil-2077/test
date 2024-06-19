const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = 5000;
const cors = require('cors');
const transactionRoutes = require('./routes/ttransactionRoute');


require('dotenv').config();

// MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
})
.then(() => console.log(`MongoDB connected at ${mongoURI}`))
.catch(err => console.error('MongoDB connection error:', err));
app.use(cors());

app.use(express.json());
app.use('/api', routes);
app.use('/table', transactionRoutes);
// server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
