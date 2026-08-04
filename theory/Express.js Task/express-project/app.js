
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello! Express is running inside Docker.');
});

app.get('/api/students', (req, res) => {
    res.json([
        { id: 1, name: 'Rahul', course: 'BCA' },
        { id: 2, name: 'Amit', course: 'MCA' }
    ]);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
