// ==========================================
// Experiment 5 - Task 1: Arrays, Objects and Functions
// ==========================================

// 1. Arrays
const fruits = ['Apple', 'Banana', 'Mango'];
console.log('--- Array Demonstration ---');
console.log('Fruits array:', fruits);

fruits.push('Orange');
console.log('After push:', fruits);

fruits.pop();
console.log('After pop:', fruits);

console.log('Number of fruits:', fruits.length);

// Loop through an array
fruits.forEach((fruit, index) => {
    console.log(`Fruit ${index + 1}: ${fruit}`);
});


// 2. Objects
const student = {
    name: 'Uday Bansal',
    age: 20,
    course: 'Backend Development'
};

console.log('\n--- Object Demonstration ---');
console.log('Student object:', student);
console.log('Student Name:', student.name);
console.log('Student Course:', student['course']);
console.log('Object keys:', Object.keys(student));


// 3. Functions
function greet(name) {
    return `Hello, ${name}! Welcome to Backend Development Lab.`;
}

// Arrow function
const add = (a, b) => a + b;

console.log('\n--- Function Demonstration ---');
console.log(greet('Student'));
console.log('add(5, 7) =', add(5, 7));
