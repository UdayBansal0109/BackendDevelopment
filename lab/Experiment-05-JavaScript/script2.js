// ==========================================
// Experiment 5 - Task 2: String, Array and Object methods
// ==========================================

// --- String Methods ---
const str = "Backend Development";
console.log("--- String Methods ---");
console.log("Original:", str);

// toUpperCase(): converts all characters to uppercase
console.log("Upper Case:", str.toUpperCase());

// toLowerCase(): converts all characters to lowercase
console.log("Lower Case:", str.toLowerCase());

// split(): splits a string into an array using a delimiter
const words = str.split(" ");
console.log("Split by space:", words);


// --- Array Methods (Add, Read, Update) ---
console.log("\n--- Array Methods ---");
let items = ['Node', 'Express'];

// Add: push() adds an element to the end
items.push('MongoDB');
console.log("After Adding:", items);

// Read: access an element by index
console.log("First Item (Read):", items[0]);

// Update: change an element by index
items[0] = 'Node.js';
console.log("After Updating:", items);

// map() and filter()
console.log("Lengths (map):", items.map(item => item.length));
console.log("Longer than 5 chars (filter):", items.filter(item => item.length > 5));


// --- Object Methods (Add, Read, Update) ---
console.log("\n--- Object Methods ---");
let user = { name: "John", role: "Dev" };

// Add: new key-value pair
user.age = 25;
console.log("After Adding Key:", user);

// Read: dot notation
console.log("User Name (Read):", user.name);

// Update: modify an existing value
user.role = "Senior Dev";
console.log("After Updating Role:", user);

// Delete a key
delete user.age;
console.log("After Deleting Age:", user);
