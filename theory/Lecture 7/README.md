# Lecture 7 — localStorage, sessionStorage and JSON

**Unit 1:** Introduction to Backend Development

---

## Objective

Store data in the browser using the Web Storage API and understand why objects must be converted to JSON first.

The final task (Notes App) became [Assignment 1](../Assignment/Assignment%201/README.md).

---

## Exercise 2.1 — localStorage

1. `localStorage.setItem("favColor", "blue")` then `getItem("favColor")` returns `"blue"`.
2. DevTools, Application, Local Storage shows `favColor = blue`.
3. After `clear()` and a refresh the key is gone (`getItem` returns `null`).

## Exercise 3.1 — "The Disappearing Act" (sessionStorage)

- `sessionStorage.setItem("tempData", "hello")` then `getItem` returns `"hello"`.
- After closing the tab and reopening, `getItem("tempData")` returns `null`.
- The same steps with localStorage keep the value.

## The JSON Problem

```js
localStorage.setItem("user", { name: "Alice" });       // stores "[object Object]"
localStorage.setItem("user", JSON.stringify(user));    // stores '{"name":"Alice"}'
const user = JSON.parse(localStorage.getItem("user")); // back to an object
```

## Comparison

| | localStorage | sessionStorage |
|---|---|---|
| Lifetime | Until deleted | Until the tab is closed |
| Scope | All tabs of the same origin | One tab |
| Size | ~5–10 MB | ~5–10 MB |
| Stores | Strings only | Strings only |

---

<div align="center">

[Lecture 6](../Lecture%206/README.md) | [Theory Index](../README.md) | [Lecture 8](../Lecture%208/README.md)

</div>
