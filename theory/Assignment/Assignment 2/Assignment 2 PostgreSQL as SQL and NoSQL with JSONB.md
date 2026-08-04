# Assignment 2 — PostgreSQL as SQL + NoSQL: Working with JSONB

**Name:** Uday Bansal · **SAP ID:** 590013278 · **Course:** Backend Development (CSFS3008P)

Supporting files in this folder: `products_jsonb.sql` (Part B, PostgreSQL), `postgres-output.txt`,
`products_mongo.js` (Task 7, mongosh), `mongo-output.txt`.

> The SQL was executed on PGlite 0.6 (PostgreSQL 19 compiled to WebAssembly) because a PostgreSQL server is not
> installed on my laptop; the MongoDB script was executed against a local test MongoDB server.

---

## Part A — Conceptual questions

### 1. What is `jsonb`, and how does it differ from `json`?
Both types store JSON documents inside one column, and both reject invalid JSON. The difference is the
storage format. **`json`** stores the *exact text* that was inserted – whitespace, key order and even
duplicate keys are kept – so every time a query reads a key, PostgreSQL must re-parse the text.
**`jsonb`** ("JSON binary") parses the document **once, at write time**, and stores a decomposed binary
tree: whitespace is removed, keys are sorted and only the last duplicate key is kept.

* **Writes:** `jsonb` is slightly *slower* to insert because of the conversion step.
* **Reads/queries:** `jsonb` is much *faster*, because keys are found without re-parsing.
* **Indexing:** only `jsonb` supports GIN indexes and the containment (`@>`) / key-exists (`?`) operators.

```sql
SELECT '{"b":1, "a":2, "a":3}'::json;   -- {"b":1, "a":2, "a":3}   (text kept as is)
SELECT '{"b":1, "a":2, "a":3}'::jsonb;  -- {"a": 3, "b": 1}        (normalised)
```
Rule of thumb: use `json` only when the original text must be preserved exactly (e.g. an audit log);
otherwise use `jsonb`.

### 2. How can PostgreSQL act as SQL and NoSQL in the same table?
A table can mix **strict relational columns** for the data every row has, with a **`jsonb` column** for data
that differs from row to row. The fixed columns keep SQL guarantees – types, `NOT NULL`, primary/foreign
keys, joins and transactions – while the `jsonb` column behaves like a MongoDB document: each row may carry
different keys and new keys can be added without `ALTER TABLE`.

```sql
CREATE TABLE products (
    id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  -- SQL
    name       VARCHAR(100) NOT NULL,                             -- SQL
    category   VARCHAR(50)  NOT NULL,                             -- SQL
    price      NUMERIC(10,2) NOT NULL,                            -- SQL
    attributes JSONB                                              -- NoSQL part
);
```
In my catalog a book stores `{author, pages}`, a laptop `{ram_gb, cpu, storage_gb}` and a mouse
`{color, wireless, dpi}` – all in the same table, and price is still a real `NUMERIC` that can be summed,
validated and indexed normally. This "hybrid" design avoids one column per possible attribute (mostly NULL)
or an entity-attribute-value table.

### 3. `jsonb` operators with returned values
| Operator | Meaning | Example (from my data) | Returns |
|---|---|---|---|
| `->` | get key, result stays **jsonb** | `attributes -> 'pages'` (Clean Code) | `464` (jsonb number) |
| `->>` | get key as **text** | `attributes ->> 'pages'` | `'464'` (text) |
| `@>` | left document **contains** right | `attributes @> '{"wireless": true}'` | `true` only for Wireless Mouse |
| `?` | top-level **key exists** | `attributes ? 'edition'` | `true` for The Pragmatic Programmer, `false` for Clean Code |

```sql
SELECT name, attributes -> 'pages', attributes ->> 'pages', attributes ? 'edition'
FROM products WHERE category = 'book';
```
**`->` vs `->>`:** `->` returns jsonb, so it can be chained (`attributes -> 'specs' -> 'cpu'`) and compared to
other jsonb values; `->>` returns plain text, which is what we need for `=`, `LIKE` or a cast such as
`(attributes ->> 'ram_gb')::int >= 16`.

### 4. How does a GIN index on `jsonb` change performance?
A **GIN (Generalized Inverted Index)** stores, for every key and key/value pair inside the documents, the list
of rows that contain it – like the index at the back of a book. Without it, `WHERE attributes @> '{...}'`
must read and test **every row** (sequential scan). With it, PostgreSQL looks up the pair in the index and
reads only matching rows (*Bitmap Index Scan → Bitmap Heap Scan*), so large tables are searched in roughly
logarithmic instead of linear time.

```sql
CREATE INDEX idx_products_attributes ON products USING GIN (attributes);
EXPLAIN ANALYZE SELECT name FROM products WHERE attributes @> '{"wireless": true}';
-- Bitmap Index Scan on idx_products_attributes  (seen in postgres-output.txt)
```
* **Speeds up:** containment `@>`, key-exists `?`, `?|`, `?&`.
* **Does not help:** range comparisons on extracted values, e.g.
  `WHERE (attributes ->> 'ram_gb')::int >= 16` – the planner still did a **Seq Scan** in my test. That needs a
  B-tree *expression index*: `CREATE INDEX ON products (((attributes ->> 'ram_gb')::int));`.
* Cost: GIN indexes are larger and make inserts/updates slower.

### 5. Where can PostgreSQL + `jsonb` replace MongoDB, and where is MongoDB better?
| Criterion | PostgreSQL + jsonb | MongoDB |
|---|---|---|
| **Transactions** | Full ACID across many tables/rows – ideal for orders, payments | Multi-document transactions exist (4.0+) but add overhead; design favours single-document atomicity |
| **Joins** | Native SQL joins between jsonb rows and normal tables (`products JOIN orders`) | `$lookup` is possible but slower and limited; data is usually embedded |
| **Schema enforcement** | Strict columns + `CHECK` constraints even on jsonb keys | Schema-less by default; JSON-Schema validators/Mongoose are optional |
| **Horizontal scaling** | Mainly vertical scaling + read replicas; sharding needs extensions (Citus) | Built-in sharding and replica sets – designed to scale out |

**PostgreSQL + jsonb can replace MongoDB** when the application is mostly relational but has *some*
flexible data – e.g. an e-commerce catalog with variable product specs, user preferences or form answers –
and needs transactions and joins with orders/customers. One database is also simpler to operate.

**MongoDB is still the better fit** for very large, write-heavy, document-centric workloads that must be
sharded across many servers (IoT/event logs, content feeds), when the schema changes constantly, or when the
team works natively with JSON documents end-to-end.

```sql
-- schema enforcement on a jsonb key (not possible by default in MongoDB)
ALTER TABLE products ADD CONSTRAINT laptop_has_ram
CHECK (category <> 'laptop' OR attributes ? 'ram_gb');
```

---

## Part B — Hands-on exercise: Product catalog

### Task 1 — Schema
`CREATE TABLE products (...)` exactly as given (see `products_jsonb.sql`).

### Task 2 — Insert data (5 products, 3 categories)
| name | category | price | attributes |
|---|---|---|---|
| Clean Code | book | 499.00 | `{"author": "Robert C. Martin", "pages": 464}` |
| The Pragmatic Programmer | book | 650.00 | `{"author": "Andrew Hunt", "pages": 352, "edition": 2}` |
| ThinkPad E14 | laptop | 62000.00 | `{"ram_gb": 16, "cpu": "Intel i5-1335U", "storage_gb": 512}` |
| IdeaPad Slim 3 | laptop | 45000.00 | `{"ram_gb": 8, "cpu": "AMD Ryzen 5 7520U", "storage_gb": 512}` |
| Wireless Mouse | accessory | 799.00 | `{"color": "black", "wireless": true, "dpi": 1600}` |

### Task 3 — One query per category
```sql
-- books with more than 400 pages
SELECT name, attributes ->> 'author' AS author, (attributes ->> 'pages')::int AS pages
FROM products WHERE category = 'book' AND (attributes ->> 'pages')::int > 400;
-- → Clean Code | Robert C. Martin | 464

-- laptops with at least 16 GB RAM
SELECT name, attributes ->> 'cpu' AS cpu
FROM products WHERE category = 'laptop' AND (attributes ->> 'ram_gb')::int >= 16;
-- → ThinkPad E14 | Intel i5-1335U

-- black accessories
SELECT name, attributes ->> 'color' AS color
FROM products WHERE category = 'accessory' AND attributes ->> 'color' = 'black';
-- → Wireless Mouse | black
```

### Task 4 — Containment query
```sql
SELECT name FROM products WHERE attributes @> '{"wireless": true}';
-- → Wireless Mouse
```

### Task 5 — Update JSONB without altering the table
```sql
UPDATE products SET attributes = attributes || '{"discount_pct": 10}' WHERE name = 'Wireless Mouse';
-- attributes → {"dpi": 1600, "color": "black", "wireless": true, "discount_pct": 10}
```
The `||` operator merges the two documents; no `ALTER TABLE` was required.

### Task 6 — Index and compare
| Query | Before GIN index | After GIN index |
|---|---|---|
| `attributes @> '{"wireless": true}'` | **Seq Scan** on products, 0.257 ms | **Bitmap Index Scan on idx_products_attributes** → Bitmap Heap Scan |
| `(attributes ->> 'ram_gb')::int >= 16` | Seq Scan | still **Seq Scan** (GIN cannot serve a cast/range) |

Observation: with only 5 rows PostgreSQL's planner correctly chooses a sequential scan even when the index
exists (reading one page is cheaper than using the index), so `SET enable_seqscan = off` was used **only to
prove that the index is usable**. The real benefit appears on large tables (thousands of rows), where the
index avoids reading the whole table. Exact timings are in `postgres-output.txt`.

### Task 7 — MongoDB comparison
```javascript
db.products.find({ category: "book",      "attributes.pages":  { $gt: 400 } })   // Clean Code
db.products.find({ category: "laptop",    "attributes.ram_gb": { $gte: 16 } })   // ThinkPad E14
db.products.find({ category: "accessory", "attributes.color":  "black" })        // Wireless Mouse
db.products.find({ "attributes.wireless": true })                                 // containment
db.products.updateOne({ name: "Wireless Mouse" }, { $set: { "attributes.discount_pct": 10 } })
db.products.createIndex({ "attributes.ram_gb": 1 })   // explain() → IXSCAN on attributes.ram_gb_1
```
| Aspect | PostgreSQL jsonb | MongoDB |
|---|---|---|
| Syntax | operators `->`, `->>`, `@>` and **casts** (`::int`) because `->>` returns text | dot-notation `"attributes.ram_gb"`, values keep their type – no casts |
| Numeric comparison | needs `(attributes ->> 'ram_gb')::int` | `{ $gte: 16 }` directly |
| Indexing | one GIN index covers *all* keys for `@>`/`?`; range queries need an expression index | one B-tree index per field path; range queries use it directly (IXSCAN) |
| Updates | `attributes || '{...}'` or `jsonb_set()` | `$set` on a dotted path |
| Ease of use | slightly more verbose, but can join with normal tables and use transactions | more natural from JavaScript; no joins |

**Conclusion:** For this catalog both work. MongoDB queries were shorter to write, but PostgreSQL let me keep
`price` as a validated numeric column and would let me join products with orders in the same database –
which is why PostgreSQL + jsonb is a good replacement for MongoDB in mostly-relational applications.
