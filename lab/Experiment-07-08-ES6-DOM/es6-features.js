// ==========================================
// Experiment 7 - ES6 (ECMAScript 2015) features
// Run with:  node es6-features.js
// ==========================================

// 3.1 let and const
let counter = 1;        // can be reassigned
counter = counter + 1;
const PI = 3.14;        // cannot be reassigned
console.log('--- let / const ---');
console.log('counter =', counter, '| PI =', PI);

// 3.2 Arrow functions
const square = (n) => n * n;
const sumAll = (...nums) => nums.reduce((total, n) => total + n, 0);
console.log('\n--- Arrow functions ---');
console.log('square(5) =', square(5));

// 3.3 Template literals
const name = 'Uday';
const course = 'Backend Development';
console.log('\n--- Template literals ---');
console.log(`Hello ${name}, welcome to ${course}!`);

// 3.4 Destructuring (object and array)
const student = { id: 1, studentName: 'Aarav', branch: 'CSE' };
const { studentName, branch } = student;
const [first, second] = ['Node', 'Express', 'MongoDB'];
console.log('\n--- Destructuring ---');
console.log(studentName, branch, '|', first, second);

// 3.5 Spread and rest operators
const frontend = ['HTML', 'CSS'];
const fullStack = [...frontend, 'JavaScript', 'Node.js'];
const updatedStudent = { ...student, branch: 'IT' };
console.log('\n--- Spread / Rest ---');
console.log('fullStack:', fullStack);
console.log('updatedStudent:', updatedStudent);
console.log('sumAll(1, 2, 3, 4) =', sumAll(1, 2, 3, 4));

// 3.6 Default parameters
const greet = (person = 'Guest') => `Hi ${person}`;
console.log('\n--- Default parameters ---');
console.log(greet(), '|', greet('Uday'));

// 3.7 Classes and inheritance
class Person {
    constructor(personName) {
        this.personName = personName;
    }

    introduce() {
        return `I am ${this.personName}`;
    }
}

class Student extends Person {
    constructor(personName, rollNo) {
        super(personName);
        this.rollNo = rollNo;
    }

    introduce() {
        return `${super.introduce()}, roll number ${this.rollNo}`;
    }
}

console.log('\n--- Classes ---');
console.log(new Student('Uday', 590013278).introduce());

// 3.8 Modules - see mathUtils.mjs and modules-demo.mjs (import / export)

// 3.10 Enhanced object literals
const age = 20;
const profile = {
    name,                       // same as name: name
    age,
    describe() {                // method shorthand
        return `${this.name} is ${this.age}`;
    },
    ['skill_' + 1]: 'Node.js'   // computed property name
};
console.log('\n--- Enhanced object literals ---');
console.log(profile.describe(), profile.skill_1);

// 3.9 Promises and async / await
const fetchStudent = (id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (id > 0) resolve({ id, name: 'Aarav' });
        else reject(new Error('Invalid id'));
    }, 300);
});

async function showStudents() {
    console.log('\n--- Promises / async-await ---');
    try {
        const s = await fetchStudent(1);
        console.log('Loaded student:', s);
        await fetchStudent(-1);
    } catch (error) {
        console.log('Caught error:', error.message);
    }
}

showStudents();
