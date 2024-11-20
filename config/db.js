const mongoose = require('mongoose');
require('dotenv').config(); // For environment variables



const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database
        
        const connection = await mongoose.connect("mongodb+srv://afg154005:gnLhPlgHpuQaFjvh@cluster0.0yvn2uk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB connected successfully.");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process with an error code
    }
};

module.exports = connectDB;
