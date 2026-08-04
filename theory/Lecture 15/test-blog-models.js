// Tests the Blog schemas.
//  - Validation rules are checked without a database (document.validate()).
//  - If MONGO_URL is set, the unique index and populate() are also tested on a real MongoDB.
// Run:  node test-blog-models.js          or   MONGO_URL=mongodb://127.0.0.1:27017/blog_test node test-blog-models.js
const assert = require('assert');
const mongoose = require('mongoose');
const { Post, Comment } = require('./blog-models');

const validPost = {
    title: 'Learning Mongoose',
    slug: 'learning-mongoose',
    content: 'Schemas, models and validation.',
    author: { name: 'Uday', email: 'uday@example.com' },
    tags: ['nodejs', 'mongodb']
};

// validate() returns the ValidationError (or null) without saving anything
async function validationErrors(doc) {
    try {
        await doc.validate();
        return null;
    } catch (error) {
        return error.errors;
    }
}

async function validationTests() {
    // 1. A valid post passes validation and gets defaults
    const ok = new Post(validPost);
    assert.strictEqual(await validationErrors(ok), null);
    assert.strictEqual(ok.status, 'draft');
    console.log('valid post accepted, default status =', ok.status);

    // 2. Invalid values are rejected with our messages
    const bad = new Post({ title: 'Hi', slug: 'Bad Slug!', author: { name: 'X', email: 'no-email' }, status: 'deleted', likes: -1, tags: ['a', 'b', 'c', 'd', 'e', 'f'] });
    const errors = await validationErrors(bad);
    for (const field of ['title', 'slug', 'content', 'author.email', 'status', 'likes', 'tags']) {
        assert.ok(errors[field], `expected an error for ${field}`);
        console.log(`rejected ${field}: ${errors[field].message}`);
    }

    // 3. Comment validation
    const commentErrors = await validationErrors(new Comment({ text: 'x' }));
    assert.ok(commentErrors.post && commentErrors.author && commentErrors.text);
    console.log('comment without post/author and too-short text rejected');
}

async function databaseTests(url) {
    await mongoose.connect(url);
    await mongoose.connection.dropDatabase();
    await Post.init(); // build the unique index

    const post = await Post.create(validPost);
    await Comment.create({ post: post._id, author: 'Diya', text: 'Great post!' });

    await assert.rejects(Post.create(validPost), err => err.code === 11000);
    console.log('duplicate slug rejected by unique index (E11000)');

    const withComments = await Post.findById(post._id).populate('comments');
    assert.strictEqual(withComments.comments.length, 1);
    console.log('populate comments ->', withComments.comments.map(c => c.text));

    await mongoose.disconnect();
}

validationTests()
    .then(async () => {
        if (process.env.MONGO_URL) {
            await databaseTests(process.env.MONGO_URL);
            console.log('All blog model tests passed (with database)');
        } else {
            console.log('All validation tests passed (set MONGO_URL to also test unique index and populate)');
        }
    })
    .catch(err => { console.error(err); process.exit(1); });
