-- ==========================================
-- Lecture 14 A - Lab Exercise 2 & 3
-- Library Management System schema (PostgreSQL)
-- Book *—* Author (many-to-many through book_authors)
-- Member 1—* Loan *—1 Book
-- ==========================================

DROP TABLE IF EXISTS loans;
DROP TABLE IF EXISTS book_authors;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS members;

CREATE TABLE authors (
    author_id   SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    country     VARCHAR(50)
);

CREATE TABLE books (
    book_id          SERIAL PRIMARY KEY,
    isbn             VARCHAR(13) UNIQUE NOT NULL,
    title            VARCHAR(200) NOT NULL,
    genre            VARCHAR(50),
    published_year   INTEGER CHECK (published_year BETWEEN 1450 AND 2100),
    total_copies     INTEGER NOT NULL DEFAULT 1 CHECK (total_copies >= 0)
);

-- Junction table: a book can have many authors, an author can write many books
CREATE TABLE book_authors (
    book_id    INTEGER REFERENCES books(book_id) ON DELETE CASCADE,
    author_id  INTEGER REFERENCES authors(author_id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
);

CREATE TABLE members (
    member_id    SERIAL PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(100) UNIQUE NOT NULL,
    phone        VARCHAR(15),
    joined_on    DATE NOT NULL DEFAULT CURRENT_DATE
);

-- A member can borrow many books; each loan is one book for one member
CREATE TABLE loans (
    loan_id      SERIAL PRIMARY KEY,
    book_id      INTEGER NOT NULL REFERENCES books(book_id),
    member_id    INTEGER NOT NULL REFERENCES members(member_id),
    loan_date    DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date     DATE NOT NULL,
    return_date  DATE,
    CHECK (due_date >= loan_date),
    CHECK (return_date IS NULL OR return_date >= loan_date)
);

-- Sample data
INSERT INTO authors (name, country) VALUES
('Abraham Silberschatz', 'USA'), ('Henry F. Korth', 'USA'), ('S. Sudarshan', 'India'), ('Robert C. Martin', 'USA');

INSERT INTO books (isbn, title, genre, published_year, total_copies) VALUES
('9780073523323', 'Database System Concepts', 'Computer Science', 2010, 3),
('9780132350884', 'Clean Code', 'Software Engineering', 2008, 2);

INSERT INTO book_authors VALUES (1, 1), (1, 2), (1, 3), (2, 4);

INSERT INTO members (name, email, phone) VALUES
('Aarav Sharma', 'aarav@example.com', '9876543210'),
('Diya Verma', 'diya@example.com', '9876500000');

INSERT INTO loans (book_id, member_id, loan_date, due_date) VALUES
(1, 1, '2026-11-01', '2026-11-15'),
(2, 1, '2026-11-05', '2026-11-19'),
(2, 2, '2026-11-10', '2026-11-24');

-- Book with all its authors (many-to-many join)
SELECT b.title, STRING_AGG(a.name, ', ' ORDER BY a.name) AS authors
FROM books b
JOIN book_authors ba ON ba.book_id = b.book_id
JOIN authors a ON a.author_id = ba.author_id
GROUP BY b.title;

-- Books currently borrowed by each member
SELECT m.name AS member, b.title, l.due_date
FROM loans l
JOIN members m ON m.member_id = l.member_id
JOIN books b ON b.book_id = l.book_id
WHERE l.return_date IS NULL
ORDER BY m.name;
