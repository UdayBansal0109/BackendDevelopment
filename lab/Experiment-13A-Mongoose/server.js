const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// STEP 1: CONNECT TO MONGODB
// ============================================

// Local MongoDB (default) - can be changed with the MONGO_URL environment variable,
// e.g. a MongoDB Atlas connection string
const DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/userdb';

mongoose.connect(DB_URL)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.error('MongoDB connection error:', err.message));

// ============================================
// STEP 2: DEFINE THE USER SCHEMA
// ============================================

const userSchema = new mongoose.Schema({
    username: {
        type: String,      // must be text
        required: true,    // mandatory field
        unique: true       // no two users with the same username
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now  // set automatically
    }
});

// ============================================
// STEP 3: CREATE THE MODEL
// ============================================

// Model = interface to the "users" collection
const User = mongoose.model('User', userSchema);

// ============================================
// STEP 4: ROUTES
// ============================================

// Home page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>User Management System</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                }

                .container {
                    background: #f5f5f5;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 8px;
                }

                input {
                    width: 100%;
                    padding: 10px;
                    margin: 5px 0;
                    box-sizing: border-box;
                }

                button {
                    background: #007bff;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    cursor: pointer;
                    margin: 5px;
                }

                h1, h2 {
                    color: #333;
                }
            </style>
        </head>

        <body>
            <h1>User Management System</h1>

            <div class="container">
                <h2>Register New User</h2>

                <form action="/signup" method="POST">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                    >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    >

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    >

                    <button type="submit">Sign Up</button>
                </form>
            </div>

            <div class="container">
                <h2>Login</h2>

                <form action="/login" method="POST">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                    >

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    >

                    <button type="submit">Login</button>
                </form>
            </div>

            <div class="container">
                <h2>View All Users</h2>

                <a href="/users">
                    <button>Show All Registered Users</button>
                </a>
            </div>
        </body>
        </html>
    `);
});

// Register user
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Create a new document from the model and save it to MongoDB
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.send(`
            <h2 style="color:green;">
                User registered successfully!
            </h2>

            <p>Username: ${username}</p>
            <p>Email: ${email}</p>

            <a href="/">Go back to home</a>
        `);
    } catch (error) {
        // 11000 = duplicate key error (unique username / email)
        if (error.code === 11000) {
            return res.send(`
                <h2 style="color:red;">
                    Error: Username or email already exists
                </h2>
                <a href="/">Go back</a>
            `);
        }

        res.send(`
            <h2 style="color:red;">Error: ${error.message}</h2>
            <a href="/">Go back</a>
        `);
    }
});

// Login user
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user document by username
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.send(`
                <h2 style="color:red;">User not found</h2>
                <a href="/">Go back</a>
            `);
        }

        if (user.password !== password) {
            return res.send(`
                <h2 style="color:red;">Incorrect password</h2>
                <a href="/">Go back</a>
            `);
        }

        res.send(`
            <h2 style="color:green;">Login successful!</h2>

            <p>Welcome back, ${user.username}!</p>
            <p>Email: ${user.email}</p>
            <p>Account created: ${user.createdAt.toDateString()}</p>

            <a href="/">Go back to home</a>
        `);
    } catch (error) {
        res.send(`
            <h2 style="color:red;">Error: ${error.message}</h2>
            <a href="/">Go back</a>
        `);
    }
});

// Display all users
app.get('/users', async (req, res) => {
    try {
        // Find all user documents
        const users = await User.find();

        if (users.length === 0) {
            return res.send(`
                <h2>No users registered yet</h2>
                <a href="/">Go back to home</a>
            `);
        }

        let userList = '<h2>Registered Users</h2><ul>';

        users.forEach(user => {
            userList += `
                <li>
                    <strong>Username:</strong> ${user.username}
                    |
                    <strong>Email:</strong> ${user.email}
                    |
                    <strong>Joined:</strong>
                    ${user.createdAt.toDateString()}
                </li>
            `;
        });

        userList += '</ul><a href="/">Go back to home</a>';

        res.send(userList);
    } catch (error) {
        res.send(`<h2 style="color:red;">Error: ${error.message}</h2>`);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});