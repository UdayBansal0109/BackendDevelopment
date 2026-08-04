// ==========================================
// Assignment 1 - Notes App using localStorage (L07 Task 12)
// Must have: add, display on load, delete, edit, persist after refresh,
//            each note has id, text, createdAt, updatedAt
// Stretch goals: complete/incomplete, search/filter, categories,
//                import/export JSON, dark mode saved in localStorage
// ==========================================

const STORAGE_KEY = "notes";
const THEME_KEY = "theme";


// ---------- Step 2: helper functions ----------
function getNotes() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveNotes(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function showMessage(text) {
    document.getElementById("message").textContent = text;
}


// ---------- Step 3: CRUD operations ----------

// CREATE
function addNote(text, category) {
    text = text.trim();

    // Empty notes are not allowed
    if (!text) {
        showMessage("Note text cannot be empty.");
        return;
    }

    const notes = getNotes();
    notes.push({
        id: Date.now(),
        text: text,
        category: category,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: null
    });

    saveNotes(notes);
    showMessage("");
    renderNotes();
}

// UPDATE (edit text)
function editNote(id) {
    const notes = getNotes();
    const note = notes.find(n => n.id === id);
    if (!note) return;

    const newText = prompt("Edit note:", note.text);

    // Cancel pressed or empty text → do nothing
    if (newText === null || !newText.trim()) return;

    note.text = newText.trim();
    note.updatedAt = new Date().toISOString();
    saveNotes(notes);
    renderNotes();
}

// UPDATE (complete / incomplete)
function toggleComplete(id) {
    const notes = getNotes();
    const note = notes.find(n => n.id === id);
    if (!note) return;

    note.completed = !note.completed;
    note.updatedAt = new Date().toISOString();
    saveNotes(notes);
    renderNotes();
}

// DELETE
function deleteNote(id) {
    const notes = getNotes().filter(n => n.id !== id);
    saveNotes(notes);
    renderNotes();
}


// ---------- Step 4: render to the DOM ----------
function formatDate(iso) {
    return new Date(iso).toLocaleString();
}

function renderNotes() {
    const container = document.getElementById("notesList");
    const search = document.getElementById("searchInput").value.toLowerCase();
    const filter = document.getElementById("filterInput").value;

    const allNotes = getNotes();
    const notes = allNotes.filter(note =>
        note.text.toLowerCase().includes(search) &&
        (filter === "" || note.category === filter)
    );

    document.getElementById("counter").textContent =
        `Showing ${notes.length} of ${allNotes.length} notes`;

    container.innerHTML = "";

    if (notes.length === 0) {
        container.textContent = "No notes to show.";
        return;
    }

    // Elements are created with textContent so user text can never inject HTML
    notes.forEach(note => {
        const card = document.createElement("div");
        card.className = "note-card" + (note.completed ? " completed" : "");

        const text = document.createElement("p");
        text.className = "note-text";
        text.textContent = note.text;

        const meta = document.createElement("div");
        meta.className = "note-meta";
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = note.category || "General";
        meta.append(tag, ` Created: ${formatDate(note.createdAt)}`);
        if (note.updatedAt) {
            meta.append(` · Updated: ${formatDate(note.updatedAt)}`);
        }

        const actions = document.createElement("div");
        actions.className = "note-actions";
        actions.append(
            makeButton(note.completed ? "Mark incomplete" : "Mark complete", "secondary", () => toggleComplete(note.id)),
            makeButton("Edit", "", () => editNote(note.id)),
            makeButton("Delete", "delete", () => deleteNote(note.id))
        );

        card.append(text, meta, actions);
        container.appendChild(card);
    });
}

function makeButton(label, className, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    if (className) button.className = className;
    button.addEventListener("click", onClick);
    return button;
}


// ---------- Stretch: export / import JSON ----------
function exportNotes() {
    const blob = new Blob([JSON.stringify(getNotes(), null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notes.json";
    link.click();
    URL.revokeObjectURL(link.href);
}

function importNotes(file) {
    const reader = new FileReader();

    reader.onload = () => {
        try {
            const imported = JSON.parse(reader.result);
            if (!Array.isArray(imported)) throw new Error("File must contain an array of notes");

            // Keep only valid notes and skip ids that already exist
            const notes = getNotes();
            const existingIds = new Set(notes.map(n => n.id));
            imported
                .filter(n => n && typeof n.text === "string" && n.id && !existingIds.has(n.id))
                .forEach(n => notes.push({
                    id: n.id,
                    text: n.text,
                    category: n.category || "General",
                    completed: !!n.completed,
                    createdAt: n.createdAt || new Date().toISOString(),
                    updatedAt: n.updatedAt || null
                }));

            saveNotes(notes);
            showMessage("");
            renderNotes();
        } catch (error) {
            showMessage("Import failed: " + error.message);
        }
    };

    reader.readAsText(file);
}


// ---------- Stretch: dark / light mode saved in localStorage ----------
function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    document.getElementById("themeToggle").textContent = theme === "dark" ? "Light mode" : "Dark mode";
}


// ---------- Event listeners ----------
document.getElementById("noteForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("noteInput");
    addNote(input.value, document.getElementById("categoryInput").value);
    input.value = "";
    input.focus();
});

document.getElementById("searchInput").addEventListener("input", renderNotes);
document.getElementById("filterInput").addEventListener("change", renderNotes);
document.getElementById("exportBtn").addEventListener("click", exportNotes);

document.getElementById("importInput").addEventListener("change", (event) => {
    if (event.target.files[0]) importNotes(event.target.files[0]);
    event.target.value = "";
});

document.getElementById("themeToggle").addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
});

// Keep several open tabs in sync (localStorage is shared per origin)
window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) renderNotes();
});

// Display saved notes and theme on page load
window.onload = () => {
    applyTheme(localStorage.getItem(THEME_KEY) || "light");
    renderNotes();
};
