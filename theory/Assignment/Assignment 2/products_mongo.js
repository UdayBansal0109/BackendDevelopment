// ==========================================
// Assignment 2 - Task 7: the same product catalog in MongoDB
// Run:  mongosh --file products_mongo.js
// ==========================================

db = db.getSiblingDB('catalog');

db.products.drop();

db.products.insertMany([
    { name: 'Clean Code', category: 'book', price: 499.00, attributes: { author: 'Robert C. Martin', pages: 464 } },
    { name: 'The Pragmatic Programmer', category: 'book', price: 650.00, attributes: { author: 'Andrew Hunt', pages: 352, edition: 2 } },
    { name: 'ThinkPad E14', category: 'laptop', price: 62000.00, attributes: { ram_gb: 16, cpu: 'Intel i5-1335U', storage_gb: 512 } },
    { name: 'IdeaPad Slim 3', category: 'laptop', price: 45000.00, attributes: { ram_gb: 8, cpu: 'AMD Ryzen 5 7520U', storage_gb: 512 } },
    { name: 'Wireless Mouse', category: 'accessory', price: 799.00, attributes: { color: 'black', wireless: true, dpi: 1600 } }
]);

print('--- Books with more than 400 pages ---');
printjson(db.products.find({ category: 'book', 'attributes.pages': { $gt: 400 } }).toArray());

print('--- Laptops with at least 16 GB RAM ---');
printjson(db.products.find({ category: 'laptop', 'attributes.ram_gb': { $gte: 16 } }).toArray());

print('--- Black accessories ---');
printjson(db.products.find({ category: 'accessory', 'attributes.color': 'black' }).toArray());

print('--- Containment (wireless: true) ---');
printjson(db.products.find({ 'attributes.wireless': true }).toArray());

print('--- Add a new attribute (no schema change) ---');
db.products.updateOne({ name: 'Wireless Mouse' }, { $set: { 'attributes.discount_pct': 10 } });
printjson(db.products.findOne({ name: 'Wireless Mouse' }));

print('--- Index on a nested field ---');
db.products.createIndex({ 'attributes.ram_gb': 1 });
const plan = db.products.find({ 'attributes.ram_gb': { $gte: 16 } }).explain();
printjson(plan.queryPlanner.winningPlan);
