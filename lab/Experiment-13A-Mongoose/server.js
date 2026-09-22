const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_FILE = './users.json';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Read users from JSON file
function getUsers() {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// Save users to JSON file
function saveUsers(users) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

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
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const users = getUsers();

    const existingUser = users.find(
        user => user.username === username || user.email === email
    );

    if (existingUser) {
        return res.send(`
            <h2 style="color:red;">
                Error: Username or email already exists
            </h2>
            <a href="/">Go back</a>
        `);
    }

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    res.send(`
        <h2 style="color:green;">
            User registered successfully!
        </h2>

        <p>Username: ${username}</p>
        <p>Email: ${email}</p>

        <a href="/">Go back to home</a>
    `);
});

// Login user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = getUsers();

    const user = users.find(
        user => user.username === username
    );

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

        <a href="/">Go back to home</a>
    `);
});

// Display all users
app.get('/users', (req, res) => {
    const users = getUsers();

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
                ${new Date(user.createdAt).toDateString()}
            </li>
        `;
    });

    userList += '</ul><a href="/">Go back to home</a>';

    res.send(userList);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});