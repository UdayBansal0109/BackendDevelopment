-- ==========================================
-- Lecture 14 A - Lab Exercise 4 & 5
-- The un-normalized order table converted to 3NF (PostgreSQL)
-- ==========================================

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

-- customer_name / customer_email depend only on the customer
CREATE TABLE customers (
    customer_id  SERIAL PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(100) UNIQUE NOT NULL
);

-- product_price depends only on the product
CREATE TABLE products (
    product_id  SERIAL PRIMARY KEY,
    name        VARCHAR(100) UNIQUE NOT NULL,
    price       NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

-- an order belongs to one customer
CREATE TABLE orders (
    order_id     INTEGER PRIMARY KEY,
    customer_id  INTEGER NOT NULL REFERENCES customers(customer_id),
    order_date   DATE NOT NULL DEFAULT CURRENT_DATE
);

-- quantity depends on the whole key (order_id, product_id)
CREATE TABLE order_items (
    order_id    INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id  INTEGER REFERENCES products(product_id),
    quantity    INTEGER NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (order_id, product_id)
);

-- Same data as the original table
INSERT INTO customers (name, email) VALUES ('Aarav', 'aarav@email'), ('Diya', 'diya@email');
INSERT INTO products (name, price) VALUES ('Laptop', 65000), ('Mouse', 500), ('Keyboard', 1500);
INSERT INTO orders (order_id, customer_id) VALUES (1, 1), (2, 2);
INSERT INTO order_items VALUES (1, 1, 1), (1, 2, 2), (2, 3, 1);

-- Re-create the original view with joins (no information lost)
SELECT o.order_id, c.name AS customer_name, c.email AS customer_email,
       p.name AS product_name, p.price AS product_price, oi.quantity
FROM order_items oi
JOIN orders o    ON o.order_id = oi.order_id
JOIN customers c ON c.customer_id = o.customer_id
JOIN products p  ON p.product_id = oi.product_id
ORDER BY o.order_id, p.name;

-- Order totals
SELECT o.order_id, SUM(p.price * oi.quantity) AS order_total
FROM order_items oi
JOIN orders o   ON o.order_id = oi.order_id
JOIN products p ON p.product_id = oi.product_id
GROUP BY o.order_id
ORDER BY o.order_id;
