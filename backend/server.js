// server.js

const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./config/dbConnection');
const port = 8080;

// Import routes
const namesRoutes = require('./routes/applicationRoute');
app.use(cors());
// Use the routes
app.use(namesRoutes);

//Default route (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the Applications API');
});



connectDb()

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
