
// routes/namesRoutes.js

const express = require('express');
const router = express.Router();

// Import the controller
const applicationController = require('../controllers/applicationController');

// Define the GET route
router.get('/api/applications', applicationController.getNames);
router.post('/api/log-data', applicationController.logEvent);

// You can define other routes here (e.g., POST, PUT, DELETE)
// router.post('/api/names', namesController.createName);

module.exports = router;
