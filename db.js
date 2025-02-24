const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Replace with your actual Atlas connection string
        await mongoose.connect(
            `mongodb+srv://csonica95:${process.env.DB_PASSWORD}@cluster0.nmogj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );
        console.log('MongoDB Atlas connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
