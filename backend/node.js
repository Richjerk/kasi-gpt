const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set storage for uploaded images
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

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
            res.send('Error uploading file.');
        } else {
            // Here you would handle the business data (e.g., save to a database)
            const businessData = {
                name: req.body.businessName,
                description: req.body.businessDescription,
                email: req.body.businessEmail,
                phone: req.body.businessPhone,
                address: req.body.businessAddress,
                image: req.file.filename
            };
            console.log(businessData);
            res.send('Business listed successfully!');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
