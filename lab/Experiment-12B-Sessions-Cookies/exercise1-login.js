// ==========================================
// Experiment 12 B - Exercise 1: Simple User Login System
// register → login → dashboard (protected) → logout
// Users are kept in an in-memory array; passwords are hashed with bcrypt
// (optional challenge).
//
// Run:  node exercise1-login.js   →  http://localhost:3001
// ==========================================

const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3001;

// "Database" for this exercise
const users = [];

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'exercise1-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 10 * 60 * 1000 // 10 minutes
        }
    })
);


// Small helper that wraps page content in basic HTML
function page(title, body) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 420px; margin: 50px auto; }
                input { display: block; width: 100%; padding: 8px; margin: 8px 0; box-sizing: border-box; }
                button { padding: 8px 16px; }
                .error { color: red; }
                .success { color: green; }
            </style>
        </head>
        <body>${body}</body>
        </html>
    `;
}


// ==========================================
// AUTH MIDDLEWARE - protects the dashboard
// ==========================================

function authMiddleware(req, res, next) {

    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }

}


app.get('/', (req, res) => {
    res.redirect(req.session.user ? '/dashboard' : '/login');
});


// ==========================================
// REGISTER
// ==========================================

app.get('/register', (req, res) => {

    const error = req.query.error ? `<p class="error">${req.query.error}</p>` : '';

    res.send(page('Register', `
        <h1>Register</h1>
        ${error}
        <form action="/register" method="POST">
            <input name="username" placeholder="Username" required>
            <input name="password" type="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
        <p>Already registered? <a href="/login">Login</a></p>
    `));

});


app.post('/register', async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.redirect('/register?error=All fields are required');
    }

    if (users.find(u => u.username === username)) {
        return res.redirect('/register?error=Username already exists');
    }

    // Hash the password before storing it (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, password: hashedPassword });

    res.redirect('/login?registered=1');

});


// ==========================================
// LOGIN
// ==========================================

app.get('/login', (req, res) => {

    let message = '';
    if (req.query.registered) message = '<p class="success">Registration successful. Please login.</p>';
    if (req.query.error) message = `<p class="error">${req.query.error}</p>`;

    res.send(page('Login', `
        <h1>Login</h1>
        ${message}
        <form action="/login" method="POST">
            <input name="username" placeholder="Username" required>
            <input name="password" type="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <p>New user? <a href="/register">Register</a></p>
    `));

});


app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    // Compare the typed password with the stored hash
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.redirect('/login?error=Invalid username or password');
    }

    // Remember the user in the session
    req.session.user = { username: user.username };

    res.redirect('/dashboard');

});


// ==========================================
// DASHBOARD (only for logged-in users)
// ==========================================

app.get('/dashboard', authMiddleware, (req, res) => {

    res.send(page('Dashboard', `
        <h1>Dashboard</h1>
        <p>Welcome, <strong>${req.session.user.username}</strong>! You are logged in.</p>
        <form action="/logout" method="POST">
            <button type="submit">Logout</button>
        </form>
    `));

});


// ==========================================
// LOGOUT
// ==========================================

app.post('/logout', (req, res) => {

    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });

});


app.listen(PORT, () => {
    console.log(`Exercise 1 (login system) running on http://localhost:${PORT}`);
});
