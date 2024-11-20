const express = require('express');
const serverless = require('serverless-http');
const { builder } = require('@netlify/functions'); // To wrap Express for Netlify functions
const contactRoutes = require("../routes/contactRoutes")
const connectDB = require("../config/db")

const app = express();
app.use(express.json()); // For parsing JSON request bodies

connectDB()

app.use("/api",contactRoutes)


app.get('/.netlify/functions/server/home', (req, res) => {
    console.log("GET method on /home");
    try {
        const response = { message: 'Welcome to our website' };
        res.status(200).json(response); // Sending JSON response
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Example of using contact routes
// app.use('/api', require('./routes/contactRoutes'));

// Wrap the Express app with serverless-http
exports.handler = serverless(app); // This makes Express work in Netlify's serverless environment
