// ES6 module: named exports and a default export
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

export default function divide(a, b) {
    return b === 0 ? 'Cannot divide by zero' : a / b;
}
