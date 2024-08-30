require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
const priceSchema = new mongoose.Schema({
  price: Number,
  timestamp: { type: Date, default: Date.now },
});

const Price = mongoose.model('Price', priceSchema);

// API Routes

// Add a new price point
app.post('/api/add-price', async (req, res) => {
  try {
    const { price } = req.body;
    const newPrice = new Price({ price });
    await newPrice.save();
    res.json(newPrice);
  } catch (error) {
    console.error('Error adding price:', error);
    res.status(500).json({ message: 'Failed to add price.' });
  }
});

// Get all price points
app.get('/api/get-prices', async (req, res) => {
  try {
    const { filter } = req.query;
    let query = {};

    if (filter === '10minutes') {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60000);
      query = { timestamp: { $gte: tenMinutesAgo } };
    } else if (filter === '1hour') {
      const oneHourAgo = new Date(Date.now() - 60 * 60000);
      query = { timestamp: { $gte: oneHourAgo } };
    }

    const prices = await Price.find(query).sort({ timestamp: 1 });
    res.json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ message: 'Failed to fetch prices.' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
