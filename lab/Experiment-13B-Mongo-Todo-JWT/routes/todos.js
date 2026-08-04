// Experiment 4: Todo CRUD routes - all protected by the auth middleware.
// Every query includes { user: req.user._id } so a user can only see their own todos.
const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

const router = express.Router();


// GET /api/todos  (optional ?completed=true|false)
router.get('/', auth, async (req, res) => {
    try {
        const filter = { user: req.user._id };
        if (req.query.completed !== undefined) {
            filter.completed = req.query.completed === 'true';
        }

        const todos = await Todo.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: todos.length, todos });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});


// GET /api/todos/:id
router.get('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.json({ success: true, todo });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});


// POST /api/todos
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        const todo = await Todo.create({
            user: req.user._id,
            title,
            description,
            priority,
            dueDate
        });

        res.status(201).json({ success: true, message: 'Todo created successfully', todo });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});


// PUT /api/todos/:id
router.put('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.json({ success: true, message: 'Todo updated successfully', todo });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});


// DELETE /api/todos/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.json({ success: true, message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
