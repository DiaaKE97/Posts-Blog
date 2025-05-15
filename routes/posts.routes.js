const express = require('express');
const Post = require('../models/Posts');
const User = require('../models/Users');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verfiyUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        const error = new Error('please provide token');
        error.statusCode = 403;
        return next(error);
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: payload.email });
        if (!user) {
            const error = new Error('user not found');
            error.statusCode = 403;
            return next(error);
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Public route
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author');
        res.send(posts);
    } catch (err) {
        res.status(500).send({
            status: "fail",
            message: "error reading posts"
        });
    }
});

// Protected routes
router.post('/', verfiyUser, async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const post = await Post.create({ title, content, author: req.user._id });
        res.send(post);
    } catch (err) {
        next(err);
    }
});

router.patch('/', verfiyUser, (req, res) => {
    res.send("success");
});

router.delete('/', verfiyUser, (req, res) => {
    res.send("success");
});

module.exports = router;
