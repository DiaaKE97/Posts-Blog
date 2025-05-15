const express = require('express');
const Post = require('../models/Posts');
const User = require('../models/Users');
const router = express.Router();
const jwt = require('jsonwebtoken');


const verfiyUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        const error = new Error('please provid token');
        error.statusCode = 403;
        next(error);
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ email: payload.email });
    if (!user) {
        const error = new Error('user not found');
        error.statusCode = 403;
        next(error);
    }
    req.user = user;
    next();
}
//posts
router.use(verfiyUser)
router.post('/', async (req, res, next) => {
    try {
        const { title, content, author } = req.body;
        const post = await Post.create({ title, content, author: req.user._id })
        res.send(post);
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author');
        res.send(posts);
    } catch (err) {
        res.status(500).send({
            status: "fail",
            message: "error reading posts"
        })
    }
})

router.get('/', (req, res) => {
    res.send("succes posts");
})



router.patch('/', (req, res) => {
    res.send("success");
})

router.delete('/', (req, res) => {
    res.send("success");
})


module.exports = router;