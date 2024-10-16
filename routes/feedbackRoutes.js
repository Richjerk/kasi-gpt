// server/routes/feedbackRoutes.js

const express = require('express');
const Feedback = require('../models/feedback');

const router = express.Router();

// Route to submit feedback
router.post('/submit-feedback', (req, res) => {
    const feedback = new Feedback({
        businessId: req.body.businessId,
        userFeedback: req.body.userFeedback,
    });

    feedback.save()
        .then(() => res.status(201).send('Feedback submitted successfully!'))
        .catch(err => res.status(400).send('Error submitting feedback: ' + err));
});

// Route to get feedback for a specific business
router.get('/feedback/:businessId', (req, res) => {
    Feedback.find({ businessId: req.params.businessId })
        .then(feedbacks => res.status(200).json(feedbacks))
        .catch(err => res.status(400).send('Error fetching feedback: ' + err));
});

module.exports = router;
