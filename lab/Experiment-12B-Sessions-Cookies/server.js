const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = 3000;


// Cookie parser
app.use(cookieParser());


// Form data
app.use(
    express.urlencoded({
        extended: true
    })
);


// Session middleware
app.use(
    session({
        secret: 'mysecretkey',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000
        }
    })
);


// ==========================================
// HOME
// ==========================================

app.get('/', (req, res) => {

    if (req.session.username) {

        res.send(`
            <h1>Welcome back, ${req.session.username}!</h1>

            <p>You are logged in.</p>

            <a href="/logout">Logout</a>
        `);

    } else {

        res.send(`
            <h1>Session & Cookie Demo</h1>

            <form action="/login" method="post">

                <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    required
                />

                <button type="submit">
                    Login
                </button>

            </form>
        `);

    }

});


// ==========================================
// LOGIN
// ==========================================

app.post('/login', (req, res) => {

    const {
        username
    } = req.body;


    req.session.username = username;


    res.cookie(
        'theme',
        'dark', {
            maxAge: 900000,
            httpOnly: true
        }
    );


    res.redirect('/');

});


// ==========================================
// LOGOUT
// ==========================================

app.get('/logout', (req, res) => {

    req.session.destroy(() => {

        res.clearCookie('connect.sid');

        res.redirect('/');

    });

});


// ==========================================
// SET COOKIE
// ==========================================

app.get('/set-cookie', (req, res) => {

    res.cookie(
        'username',
        'JohnDoe', {
            maxAge: 900000
        }
    );

    res.send('Cookie has been set');

});


// ==========================================
// GET COOKIE
// ==========================================

app.get('/get-cookie', (req, res) => {

    const user = req.cookies['username'];

    res.send(
        `Cookie Retrieved: ${user}`
    );

});


// ==========================================
// DELETE COOKIE
// ==========================================

app.get('/delete-cookie', (req, res) => {

    res.clearCookie('username');

    res.send('Cookie deleted');

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});