// ==========================================
// Experiment 12 B - Exercise 2: To-Do List Manager (Session-Based)
// Each browser/session gets its own list (stored in req.session.todos).
// Optional challenge: a "theme" cookie remembers dark/light mode.
//
// Run:  node exercise2-todo.js   →  http://localhost:3002
// ==========================================

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'exercise2-secret',
        resave: false,
        saveUninitialized: true
        // no maxAge → session cookie, the list disappears when the browser is closed
    })
);


// Make sure every session has a todos array
app.use((req, res, next) => {

    if (!req.session.todos) {
        req.session.todos = [];
    }

    next();

});


// ==========================================
// VIEW THE LIST
// ==========================================

app.get('/', (req, res) => {

    const theme = req.cookies.theme === 'dark' ? 'dark' : 'light';

    const colors = theme === 'dark' ?
        { bg: '#1e1e1e', text: '#eeeeee' } :
        { bg: '#ffffff', text: '#222222' };

    // Build one <li> per to-do item; the index is used to delete it
    const items = req.session.todos.map((todo, index) => `
        <li>
            ${todo}
            <form action="/delete/${index}" method="POST" style="display:inline">
                <button type="submit">Delete</button>
            </form>
        </li>
    `).join('');

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Session To-Do List</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 500px;
                    margin: 40px auto;
                    background: ${colors.bg};
                    color: ${colors.text};
                }
                li { margin: 8px 0; }
            </style>
        </head>
        <body>
            <h1>My To-Do List</h1>
            <p>Theme: ${theme} |
                <a href="/theme/light">Light</a> |
                <a href="/theme/dark">Dark</a>
            </p>

            <form action="/add" method="POST">
                <input name="todoItem" placeholder="New task" required>
                <button type="submit">Add</button>
            </form>

            <ul>${items || '<li>No tasks yet</li>'}</ul>

            <p><small>Session ID: ${req.sessionID}</small></p>
        </body>
        </html>
    `);

});


// ==========================================
// ADD AN ITEM
// ==========================================

app.post('/add', (req, res) => {

    const item = (req.body.todoItem || '').trim();

    if (item) {
        req.session.todos.push(item);
    }

    res.redirect('/');

});


// ==========================================
// DELETE AN ITEM (by its position in the array)
// ==========================================

app.post('/delete/:id', (req, res) => {

    const id = parseInt(req.params.id);

    req.session.todos = req.session.todos.filter((item, index) => index !== id);

    res.redirect('/');

});


// ==========================================
// THEME COOKIE (optional challenge)
// ==========================================

app.get('/theme/:name', (req, res) => {

    const theme = req.params.name === 'dark' ? 'dark' : 'light';

    // Cookie lasts 30 days, so the preference survives browser restarts
    res.cookie('theme', theme, { maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.redirect('/');

});


app.listen(PORT, () => {
    console.log(`Exercise 2 (session to-do) running on http://localhost:${PORT}`);
});
