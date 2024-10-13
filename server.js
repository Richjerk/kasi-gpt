const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB (replace <username>, <password>, and <dbname> with your details)
mongoose.connect('mongodb://atlas-sql-65edfbe73d7aff59625ae3b6-3q47b.a.query.mongodb.net/myVirtualDatabase?ssl=true&authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

// Define a schema for the business listings
const businessSchema = new mongoose.Schema({
    name: String,
    description: String,
    email: String,
    phone: String,
    address: String,
    latitude: String,
    longitude: String,
    image: String
});

// Create a model for businesses
const Business = mongoose.model('Business', businessSchema);

// Set storage for uploaded images
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload middleware
const upload = multer({
    storage: storage
}).single('businessImage');

// Serve static files
app.use(express.static('public'));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Handle business form submission
app.post('/submit-business', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).send('Error uploading file.');
        }
        
        // Prepare business data
        const businessData = {
            name: req.body.businessName,
            description: req.body.businessDescription,
            email: req.body.businessEmail,
            phone: req.body.businessPhone,
            address: req.body.businessAddress,
            latitude: req.body.businessLatitude,
            longitude: req.body.businessLongitude,
            image: req.file ? req.file.filename : null
        };
        
        // Save to MongoDB
        const newBusiness = new Business(businessData);
        newBusiness.save()
            .then(() => res.send('Business listed successfully!'))
            .catch(err => {
                console.error("Error saving business to MongoDB:", err);
                res.status(500).send('Error saving business to the database.');
            });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
