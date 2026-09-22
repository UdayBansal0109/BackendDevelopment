const express = require('express');

const app = express();

const PORT = 3000;


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// ==========================================
// EJS CONFIGURATION
// ==========================================

app.set('view engine', 'ejs');

app.set('views', './views');


// ==========================================
// BASIC EXPRESS ROUTES
// ==========================================

// Home
app.get('/', (req, res) => {

    res.send('Welcome to Express Server!');

});


// Plain text
app.get('/text', (req, res) => {

    res.send('This is plain text response');

});


// HTML response
app.get('/html', (req, res) => {

    res.send(
        '<h1>HTML Response</h1>' +
        '<p>This is HTML content</p>'
    );

});


// JSON response
app.get('/json', (req, res) => {

    res.json({

        message: 'This is JSON response',

        status: 'success',

        data: {

            name: 'Uday Bansal',

            sapId: '590013278',

            branch: 'Core CSE',

            college: 'UPES',

            course: 'Backend Development'

        }

    });

});


// ==========================================
// URL PARAMETERS
// ==========================================

// User ID
app.get('/user/:id', (req, res) => {

    const userId = req.params.id;

    res.json({

        message: 'User details',

        userId: userId

    });

});


// Product category and ID
app.get('/product/:category/:id', (req, res) => {

    const {
        category,
        id
    } = req.params;

    res.json({

        category: category,

        productId: id

    });

});


// ==========================================
// QUERY PARAMETERS
// ==========================================

// Search
app.get('/search', (req, res) => {

    const {
        q,
        page,
        limit
    } = req.query;

    res.json({

        searchQuery: q,

        page: page || 1,

        limit: limit || 10

    });

});


// ==========================================
// CALCULATOR API
// ==========================================

app.get('/calculate', (req, res) => {

    const {
        num1,
        num2,
        operation
    } = req.query;

    const n1 = parseFloat(num1);

    const n2 = parseFloat(num2);

    let result;


    switch (operation) {

        case 'add':

            result = n1 + n2;

            break;


        case 'subtract':

            result = n1 - n2;

            break;


        case 'multiply':

            result = n1 * n2;

            break;


        case 'divide':

            result =
                n2 !== 0 ?
                n1 / n2 :
                'Error: Division by zero';

            break;


        default:

            result = 'Invalid operation';

    }


    res.json({

        num1: n1,

        num2: n2,

        operation: operation,

        result: result

    });

});


// ==========================================
// POST - REGISTER
// ==========================================

app.post('/register', (req, res) => {

    const {
        username,
        email,
        password
    } = req.body;


    res.json({

        message: 'Registration successful',

        user: {

            username: username,

            email: email

        }

    });

});


// ==========================================
// POST - LOGIN
// ==========================================

app.post('/login', (req, res) => {

    const {
        email,
        password
    } = req.body;


    if (
        email === 'test@example.com' &&
        password === 'password123'
    ) {

        res.json({

            success: true,

            message: 'Login successful',

            token: 'sample-jwt-token'

        });

    } else {

        res.status(401).json({

            success: false,

            message: 'Invalid credentials'

        });

    }

});


// ==========================================
// EJS - HOME PAGE
// ==========================================

app.get('/home', (req, res) => {

    res.render('home', {

        title: 'Home Page',

        heading: 'Welcome to EJS Templating',

        message: 'EJS makes it easy to generate dynamic HTML'

    });

});


// ==========================================
// EJS - USERS
// ==========================================

app.get('/users', (req, res) => {

    const users = [

        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
        },

        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com'
        },

        {
            id: 3,
            name: 'Bob Johnson',
            email: 'bob@example.com'
        }

    ];


    res.render('users', {

        users: users

    });

});


// ==========================================
// EJS - PROFILE
// ==========================================

app.get('/profile/:id', (req, res) => {

    const user = {

        id: req.params.id,

        name: 'Uday Bansal',

        email: 'uday@example.com',

        age: 20,

        city: 'Dehradun'

    };


    res.render('profile', {

        user: user

    });

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );


    console.log(
        'Available endpoints:'
    );


    console.log(
        'GET  / - Welcome message'
    );


    console.log(
        'GET  /text - Plain text'
    );


    console.log(
        'GET  /html - HTML response'
    );


    console.log(
        'GET  /json - JSON response'
    );


    console.log(
        'GET  /user/:id - User by ID'
    );


    console.log(
        'GET  /product/:category/:id - Product'
    );


    console.log(
        'GET  /search?q=term - Search'
    );


    console.log(
        'GET  /calculate?num1=10&num2=5&operation=add'
    );


    console.log(
        'POST /register - Register user'
    );


    console.log(
        'POST /login - Login user'
    );


    console.log(
        'GET  /home - EJS home page'
    );


    console.log(
        'GET  /users - Users list'
    );


    console.log(
        'GET  /profile/:id - User profile'
    );

});