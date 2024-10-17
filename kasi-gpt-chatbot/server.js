const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// MongoDB connection
mongoose.connect('YOUR_MONGODB_URI', { useNewUrlParser: true, useUnifiedTopology: true });

// Business Schema
const businessSchema = new mongoose.Schema({
    name: String,
    description: String,
    email: String,
    phone: String,
    address: String,
    image: String
});

const Business = mongoose.model('Business', businessSchema);

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the filename
    }
});

const upload = multer({ storage });

// API endpoint for submitting business details
app.post('/api/businesses', upload.single('image'), async (req, res) => {
    try {
        const { name, description, email, phone, address } = req.body;
        const image = req.file ? req.file.path : null;

        const newBusiness = new Business({ name, description, email, phone, address, image });
        await newBusiness.save();
        res.status(201).json({ message: 'Business listed successfully!', business: newBusiness });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error listing business.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
