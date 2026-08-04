# Lecture 6 — Server-side Sessions, Cookies and State Management

**Unit 1:** Introduction to Backend Development

---

## Objective

Understand how HTTP remains stateless and how sessions, cookies and tokens let a server "remember" a user.

This lecture has no separate lab exercise — the hands-on work is in [Lab Experiment 12B](../../lab/Experiment-12B-Sessions-Cookies/README.md).

---

## Key Concepts

| Concept | Meaning |
|---|---|
| **Stateless HTTP** | Every request is independent; the server does not remember the previous one |
| **Cookie** | Small key-value data stored by the browser and sent with every request (`Set-Cookie` / `Cookie`) |
| **Session** | Data stored on the server; the browser only keeps a session id cookie |
| **Token (JWT)** | Signed data kept by the client; the server verifies it instead of storing a session |

## Cookie Attributes

| Attribute | Purpose |
|---|---|
| `HttpOnly` | JavaScript cannot read it — protects against XSS |
| `Secure` | Sent only over HTTPS |
| `SameSite` | Limits cross-site sending — protects against CSRF |
| `Max-Age` / `Expires` | Lifetime; without it the cookie ends with the browser session |

## Session vs Cookie vs JWT

| | Session | Cookie (data) | JWT |
|---|---|---|---|
| Stored on | Server | Browser | Client |
| Scales to many servers | Needs a shared store (Redis) | Yes | Yes |
| Easy logout / revoke | Yes (destroy session) | Yes (clear cookie) | No (needs a block-list or short expiry) |
| Typical use | Login state | Preferences (theme) | APIs, mobile apps |

---

<div align="center">

[Lecture 5](../Lecture%205/README.md) | [Theory Index](../README.md) | [Lecture 7](../Lecture%207/README.md)

</div>
