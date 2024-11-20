const mongoose = require('mongoose');
require('dotenv').config(); // For environment variables


console.log(process.env.MONGO_URI);

const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database
        
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully.");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process with an error code
    }
};

module.exports = connectDB;
