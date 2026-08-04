// ==========================================
// Experiment 7 & 8 - Practical Exercise: Interactive To-Do List
// Uses ES6 (class, arrow functions, spread, destructuring, template literals),
// DOM manipulation and event handling (including event delegation).
// ==========================================

// State
let tasks = [];

// DOM elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const summary = document.getElementById("summary");

// ES6 class for a Task
class Task {
    constructor(title) {
        this.id = Date.now();
        this.title = title;
        this.completed = false;
    }
}

// Render all tasks
const renderTasks = () => {
    list.innerHTML = "";

    tasks.forEach(({ id, title, completed }) => {      // destructuring
        const li = document.createElement("li");
        li.dataset.id = id;

        const span = document.createElement("span");
        span.textContent = title;
        if (completed) span.classList.add("done");

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("delete-btn");

        li.append(span, delBtn);
        list.appendChild(li);
    });

    const doneCount = tasks.filter(t => t.completed).length;
    summary.textContent = `${doneCount} of ${tasks.length} tasks completed`;
};

// Add a task
const addTask = () => {
    const title = input.value.trim();
    if (!title) return;

    tasks = [...tasks, new Task(title)];   // spread operator
    input.value = "";
    renderTasks();
};

// Event listeners
addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

// Event delegation: one listener on the <ul> handles toggle and delete
list.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (event.target.classList.contains("delete-btn")) {
        tasks = tasks.filter(t => t.id !== id);
    } else {
        tasks = tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
    }

    renderTasks();
});

renderTasks();
