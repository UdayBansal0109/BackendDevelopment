-- ==========================================
-- Assignment 2 - Part B: Product catalog with JSONB
-- Run:  psql -U postgres -d <database> -f products_jsonb.sql
-- ==========================================

DROP TABLE IF EXISTS products;

-- Task 1: fixed (SQL) columns + one flexible (NoSQL) jsonb column
CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    attributes JSONB
);

-- Task 2: 5 products, 3 categories, different attribute keys per category
INSERT INTO products (name, category, price, attributes) VALUES
('Clean Code',       'book',      499.00,  '{"author": "Robert C. Martin", "pages": 464}'),
('The Pragmatic Programmer', 'book', 650.00, '{"author": "Andrew Hunt", "pages": 352, "edition": 2}'),
('ThinkPad E14',     'laptop',  62000.00,  '{"ram_gb": 16, "cpu": "Intel i5-1335U", "storage_gb": 512}'),
('IdeaPad Slim 3',   'laptop',  45000.00,  '{"ram_gb": 8, "cpu": "AMD Ryzen 5 7520U", "storage_gb": 512}'),
('Wireless Mouse',   'accessory', 799.00,  '{"color": "black", "wireless": true, "dpi": 1600}');

SELECT id, name, category, price, attributes FROM products;

-- Task 3: one query per category on a category-specific attribute
-- books with more than 400 pages
SELECT name, attributes ->> 'author' AS author, (attributes ->> 'pages')::int AS pages
FROM products
WHERE category = 'book'
  AND (attributes ->> 'pages')::int > 400;

-- laptops with at least 16 GB RAM
SELECT name, attributes ->> 'cpu' AS cpu
FROM products
WHERE category = 'laptop'
  AND (attributes ->> 'ram_gb')::int >= 16;

-- black accessories
SELECT name, attributes ->> 'color' AS color
FROM products
WHERE category = 'accessory'
  AND attributes ->> 'color' = 'black';

-- Operators used in Part A, Q3
SELECT name,
       attributes -> 'pages'    AS pages_as_jsonb,
       attributes ->> 'pages'   AS pages_as_text,
       attributes ? 'edition'   AS has_edition_key
FROM products
WHERE category = 'book';

-- Task 4: containment query
SELECT name FROM products WHERE attributes @> '{"wireless": true}';

-- Task 5: add a new attribute without ALTER TABLE
UPDATE products
SET attributes = attributes || '{"discount_pct": 10}'
WHERE name = 'Wireless Mouse';

SELECT name, attributes FROM products WHERE name = 'Wireless Mouse';

-- Task 6: EXPLAIN ANALYZE before the index
EXPLAIN ANALYZE
SELECT name FROM products WHERE attributes @> '{"wireless": true}';

CREATE INDEX idx_products_attributes ON products USING GIN (attributes);

-- With only 5 rows the planner still prefers a sequential scan (cheaper),
-- so seqscan is disabled for this session only to show that the GIN index CAN be used.
SET enable_seqscan = off;

EXPLAIN ANALYZE
SELECT name FROM products WHERE attributes @> '{"wireless": true}';

-- The GIN index does NOT help a ->> comparison with a cast (needs an expression index)
EXPLAIN ANALYZE
SELECT name FROM products WHERE (attributes ->> 'ram_gb')::int >= 16;

SET enable_seqscan = on;
