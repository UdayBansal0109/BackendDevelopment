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

    // Task 1: details as plain text
    res.type('text').send(
        'Name: Uday Bansal | Roll No (SAP ID): 590013278 | Branch: Core CSE'
    );

});


// HTML response
app.get('/html', (req, res) => {

    // Task 1: details as HTML
    res.send(
        '<h1>HTML Response</h1>' +
        '<p><strong>Name:</strong> Uday Bansal</p>' +
        '<p><strong>Roll No (SAP ID):</strong> 590013278</p>' +
        '<p><strong>Branch:</strong> Core CSE</p>'
    );

});


// JSON response
app.get('/json', (req, res) => {

    res.json({

        message: 'This is JSON response',

        status: 'success',

        data: {

            name: 'Uday Bansal',

            rollNo: '590013278',

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


        case 'modulus':

            result =
                n2 !== 0 ?
                n1 % n2 :
                'Error: Modulus by zero';

            break;


        case 'power':

            result = Math.pow(n1, n2);

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
// TASK 3 - STUDENT MANAGEMENT
// ==========================================

// In-memory list of students (no database in this experiment)
const students = [

    {
        id: 1,
        name: 'Aarav Sharma',
        course: 'B.Tech CSE',
        semester: 5
    },

    {
        id: 2,
        name: 'Diya Verma',
        course: 'B.Tech IT',
        semester: 3
    },

    {
        id: 3,
        name: 'Rohan Gupta',
        course: 'B.Tech CSE',
        semester: 5
    }

];


// GET /students - all students
app.get('/students', (req, res) => {

    res.json(students);

});


// GET /students/:id - one student
app.get('/students/:id', (req, res) => {

    const student = students.find(
        s => s.id === parseInt(req.params.id)
    );


    if (!student) {

        return res.status(404).json({
            message: 'Student not found'
        });

    }


    res.json(student);

});


// POST /students/add - add a new student
app.post('/students/add', (req, res) => {

    const {
        name,
        course,
        semester
    } = req.body;


    if (!name || !course) {

        return res.status(400).json({
            message: 'name and course are required'
        });

    }


    const newStudent = {

        id: students.length + 1,

        name: name,

        course: course,

        semester: parseInt(semester) || 1

    };


    students.push(newStudent);


    res.status(201).json({

        message: 'Student added successfully',

        student: newStudent

    });

});


// ==========================================
// TASK 4 - EJS COURSE TIMETABLE
// ==========================================

app.get('/timetable', (req, res) => {

    const timetable = [

        { day: 'Monday', time: '09:00 - 10:00', subject: 'Backend Development', faculty: 'Prateek Raj Gautam' },

        { day: 'Monday', time: '10:00 - 11:00', subject: 'Operating Systems', faculty: 'Dr. Singh' },

        { day: 'Tuesday', time: '11:00 - 12:00', subject: 'Computer Networks', faculty: 'Dr. Gupta' },

        { day: 'Wednesday', time: '09:00 - 11:00', subject: 'Backend Development Lab', faculty: 'Prateek Raj Gautam' },

        { day: 'Thursday', time: '02:00 - 03:00', subject: 'Database Management Systems', faculty: 'Dr. Verma' },

        { day: 'Friday', time: '10:00 - 11:00', subject: 'Data Structures', faculty: 'Dr. Sharma' }

    ];


    res.render('timetable', {

        title: 'Course Timetable',

        timetable: timetable

    });

});


// ==========================================
// TASK 5 - EJS FORM HANDLING
// ==========================================

// Show the registration form
app.get('/register-form', (req, res) => {

    res.render('register', {

        error: null

    });

});


// Handle the submitted form and show a result page
app.post('/register-form', (req, res) => {

    const {
        name,
        email,
        course,
        semester
    } = req.body;


    // Simple server-side validation
    if (!name || !email || !course || !semester) {

        return res.render('register', {

            error: 'All fields are required'

        });

    }


    res.render('result', {

        student: {
            name,
            email,
            course,
            semester
        }

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


    console.log(
        'GET  /students | GET /students/:id | POST /students/add'
    );


    console.log(
        'GET  /timetable - EJS timetable'
    );


    console.log(
        'GET  /register-form - EJS registration form'
    );

});