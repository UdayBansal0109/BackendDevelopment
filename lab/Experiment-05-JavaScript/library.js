// ==========================================
// Experiment 5 - PBL Activity: Library Book Manager
// Run with:  node library.js
// ==========================================

// 1. Array that stores all the books
const library = [];

// 2. Add a new book object to the library
function addBook(title, author) {
    const book = {
        id: library.length + 1,
        title: title,
        author: author
    };

    library.push(book);
    return book;
}

// 3. Find a book by its title (case-insensitive)
function findBook(title) {
    return library.find(
        book => book.title.toLowerCase() === title.toLowerCase()
    );
}

// 4. Testing the functions
addBook('Clean Code', 'Robert C. Martin');
addBook('You Don\'t Know JS', 'Kyle Simpson');
addBook('Node.js Design Patterns', 'Mario Casciaro');

console.log('--- All Books ---');
console.table(library);

console.log('\n--- Search: "clean code" ---');
console.log(findBook('clean code'));

console.log('\n--- Search: "Unknown Book" ---');
const result = findBook('Unknown Book');
console.log(result ? result : 'Book not found');

// Export the functions so they can be reused
module.exports = { library, addBook, findBook };
