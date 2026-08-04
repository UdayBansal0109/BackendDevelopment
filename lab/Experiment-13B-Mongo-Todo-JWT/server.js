// ==========================================
// Experiment 13 B - User Registration, Login (JWT) and Todo List
// with Express + Mongoose
// ==========================================
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB (Experiment 1)
connectDB();

// Middleware to read JSON request bodies
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Todo API is running',
        endpoints: {
            register: 'POST /api/auth/register',
            login: 'POST /api/auth/login',
            me: 'GET /api/auth/me',
            todos: 'GET | POST /api/todos, GET | PUT | DELETE /api/todos/:id'
        }
    });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
