// ==========================================
// Lecture 8 - Server-side rendering with Express + EJS
// Lab Exercise 1 (table with alternating rows), 2 (/about), 4 (custom CSS file)
// Run:  npm install  →  node server.js  →  http://localhost:3000
// ==========================================

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Exercise 4: serve CSS (and other static files) from the "public" folder
app.use(express.static(__dirname + "/public"));

const students = [
    { id: 1, name: "Aarav", branch: "CSE", semester: 5 },
    { id: 2, name: "Diya", branch: "ECE", semester: 3 },
    { id: 3, name: "Rohan", branch: "IT", semester: 5 },
    { id: 4, name: "Meera", branch: "CSE", semester: 1 },
    { id: 5, name: "Kabir", branch: "ME", semester: 7 }
];

app.get("/", (req, res) => {
    res.redirect("/students");
});

// Exercise 1: student list rendered as an HTML table
app.get("/students", (req, res) => {
    res.render("students", { title: "Student List", students });
});

// Exercise 2: about page with values passed as variables
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        courseName: "Backend Development (CSFS3008P)",
        lecturerName: "Prateek Raj Gautam"
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started at http://localhost:3000");
});
