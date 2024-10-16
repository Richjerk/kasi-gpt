// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const { GeminiClient } = require('@google/generative-ai');
const Feedback = require('./models/feedback'); // Ensure this path matches where your Feedback model is defined
const feedbackRoutes = require('./routes/feedbackRoutes'); // Include your feedback routes if created

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional: Enable CORS if making requests from a different domain
// const cors = require('cors');
// app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a schema for business listings
const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ }, // Basic email validation
  phone: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: String, default: null },
  longitude: { type: String, default: null },
  image: { type: String, default: null },
});

// Create a model for businesses
const Business = mongoose.model('Business', businessSchema);

// Set storage for uploaded images
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// File filter to allow only image uploads
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only images are allowed'), false);
  }
  cb(null, true);
};

// Initialize multer upload middleware
const upload = multer({ storage, fileFilter });

// Serve static files (e.g., for images or frontend HTML/CSS/JS)
app.use(express.static('public'));

// Handle business form submission
app.post('/submit-business', upload.single('businessImage'), (req, res) => {
  const {
    businessName, businessDescription, businessEmail,
    businessPhone, businessAddress, businessLatitude, businessLongitude,
  } = req.body;

  // Simple validation
  if (!businessName || !businessDescription || !businessEmail || !businessPhone || !businessAddress) {
    return res.status(400).send('All fields are required.');
  }

  const businessData = {
    name: businessName,
    description: businessDescription,
    email: businessEmail,
    phone: businessPhone,
    address: businessAddress,
    latitude: businessLatitude || null,
    longitude: businessLongitude || null,
    image: req.file ? req.file.filename : null,
  };

  const newBusiness = new Business(businessData);
  newBusiness.save()
    .then(() => res.status(201).send('Business listed successfully!'))
    .catch((err) => {
      console.error('Error saving business to MongoDB:', err);
      res.status(500).send('Error saving business to the database.');
    });
});

// Handle geo-location saving
app.post('/save-location', (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).send('Latitude and longitude are required.');
  }

  console.log(`User's location: Latitude ${latitude}, Longitude ${longitude}`);
  res.send('Location saved!');
});

// Initialize the Gemini AI client
const gemini = new GeminiClient({ apiKey: process.env.GEMINI_API_KEY });

// Handle chatbot requests
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await gemini.generateResponse({ prompt: message });
    res.json({ response: response.data.choices[0].message });
  } catch (error) {
    console.error('Error processing chatbot response:', error);
    res.status(500).send('Error processing chatbot response');
  }
});

// Use Feedback Routes
app.use('/api', feedbackRoutes); // Use feedback routes here

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



