// ==========================================
// Lecture 3 - Setting up the backend environment (Express part)
// Tasks 1-5 combined into one server + Lab Exercise 3 (/students/branch/:branch)
// Run:  npm install  →  node server.js  →  http://localhost:3000
// ==========================================

const express = require("express");
const app = express();

// Task 5: EJS template engine (views/ folder)
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const students = [
    { id: 1, name: "Aarav", branch: "CSE" },
    { id: 2, name: "Diya", branch: "ECE" },
    { id: 3, name: "Rohan", branch: "IT" },
    { id: 4, name: "Kabir", branch: "CSE" }
];


// Task 1 + Task 5: home page (rendered with EJS)
app.get("/", (req, res) => {
    res.render("home");
});


// Task 3: JSON data
app.get("/students", (req, res) => {
    res.json(students);
});

// Lab Exercise 3: all students of one branch, e.g. /students/branch/CSE
// (declared before /students/:id so "branch" is not treated as an id)
app.get("/students/branch/:branch", (req, res) => {
    const branch = req.params.branch.toUpperCase();
    const result = students.filter(s => s.branch === branch);

    if (result.length === 0) {
        return res.status(404).json({ error: `No students found in branch ${branch}` });
    }

    res.json(result);
});

app.get("/students/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: "Student not found" });
    }
});


// Task 4: HTML responses built as strings
app.get("/html/students", (req, res) => {
    let html = "<h2>All Students</h2><ul>";
    students.forEach(s => {
        html += `<li><strong>${s.name}</strong> — ${s.branch}</li>`;
    });
    html += "</ul>";

    res.send(html);
});


// Task 5: the same list rendered from an EJS template
app.get("/view/students", (req, res) => {
    res.render("students", { students: students });
});


app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});