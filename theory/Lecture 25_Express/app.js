// ==========================================
// Lecture 25 - Introduction to Express.js (PBL activity)
// Base app.js for the Student Management System backend
// Run:  npm install  →  npm start  →  http://localhost:3000
// ==========================================

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to read JSON request bodies (used by later routes)
app.use(express.json());

// Root route - confirms the API is running
app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
