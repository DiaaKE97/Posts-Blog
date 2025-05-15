const express = require('express')
// const fs = require('fs').promises;
// const path = require('path');
const router = express.Router();
const User = require('../models/Users');
const authController = require('../controllers/auth.controller')
const Joi = require('joi');

//authentication routes
const loginSchema = Joi.object({
    email: Joi.string().min(2).max(30).email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        const err = new Error(error.details[0].message);
        err.statusCode = 400;
        return next(err); 
    }
    next();
};


router.post('/login', validateLogin, authController.login)
router.post('/', authController.signup)


//handle users
// My Own : middleware
//users
router.get('/', async (req, res, next) => {
    try {

        // const usersPath = path.join(__dirname, 'userdasdass.json')
        // const data = await fs.readFile(usersPath, 'utf-8')
        const usersData = await User.find();
        res.send(usersData);
    } catch (err) {
        // console.log("Error Reading file");
        // res.status(500).send("Error Reading file")
        next(err);
    }
    // fs.readFile(usersPath, (err, data)=>{
    //     if(err) res.status(500).send("something went wrong")
    //     res.send(JSON.parse(data));
    // })
})

router.get('/:id', (req, res) => {
    res.send("success users routes");
})

router.post('/', authController.signup)

router.patch('/:id', (req, res) => {
    res.send("success");
})

router.delete('/:id', (req, res) => {
    res.send("success");
})




module.exports = router;