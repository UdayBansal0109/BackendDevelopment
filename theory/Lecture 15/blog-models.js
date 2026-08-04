// ==========================================
// Lecture 15 - Lab Exercise 4 & 5: Mongoose schemas for a Blog Application
// with validation rules (required, unique, enum, min/max length, match)
// ==========================================
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',                       // reference to the parent post
        required: [true, 'A comment must belong to a post']
    },
    author: {
        type: String,
        required: [true, 'Comment author is required'],
        trim: true
    },
    text: {
        type: String,
        required: [true, 'Comment text is required'],
        minlength: [2, 'Comment is too short'],
        maxlength: [500, 'Comment cannot exceed 500 characters']
    }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [5, 'Title must be at least 5 characters'],
        maxlength: [150, 'Title cannot exceed 150 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true,                      // unique index in MongoDB
        lowercase: true,
        match: [/^[a-z0-9-]+$/, 'Slug may contain only lowercase letters, numbers and hyphens']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        name: { type: String, required: true },
        email: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Invalid author email'] }
    },
    status: {
        type: String,
        enum: { values: ['draft', 'published', 'archived'], message: '{VALUE} is not a valid status' },
        default: 'draft'
    },
    tags: {
        type: [String],
        validate: {
            validator: tags => tags.length <= 5,
            message: 'A post can have at most 5 tags'
        }
    },
    likes: {
        type: Number,
        min: [0, 'Likes cannot be negative'],
        default: 0
    }
}, { timestamps: true });

// Virtual relation: post.comments (filled with .populate('comments'))
postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
});

const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Post, Comment };
