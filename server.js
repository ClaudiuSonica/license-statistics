const express = require('express');
const connectDB = require('./db'); // adjust path if needed

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Hello, MEVN app with MongoDB!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
