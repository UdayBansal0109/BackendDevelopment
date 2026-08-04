// ==========================================
// Lecture 4 - Lab Exercise 4
// fetch() all students from the Express server (Lecture 3) and keep only
// the CSE students on the client side.
//
// Run in Node (v18+ has fetch built in):   node fetch-students.js
// Or paste the function into the DevTools Console while http://localhost:3000 is open.
// ==========================================

async function getCseStudents(baseUrl = "http://localhost:3000") {
    const response = await fetch(`${baseUrl}/students`);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const students = await response.json();

    // Filtering happens in the client, not on the server
    return students.filter(student => student.branch === "CSE");
}

getCseStudents()
    .then(cseStudents => {
        console.log(`Found ${cseStudents.length} CSE students:`);
        console.table(cseStudents);
    })
    .catch(error => console.error("Request failed:", error.message));
