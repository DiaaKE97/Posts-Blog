// const { log } = require('console');
const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const port = process.env.PORT;
const users = [{ id: 1, name: "diaa" }]
const userRoutes = require('./routes/users.routes');
const postRoutes = require('./routes/posts.routes');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(morgan("combined"));

//Express middlewares
// app.use(express.static("public")) //3000
app.use(express.json())
app.use(express.urlencoded())

// Routes
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

//global error handler 
app.use((err, req, res, next) => {
    const message = err?.message;
    res.status(500).send({
        statusCode: err.statusCode || 500,
        message: err.message || 'something went wrong',
        errors: []
    })
})

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Mongoose Connected Successfully");

    })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// app.use((req, res, next) => {
//     console.log("Current Request at : ", new Date());
//     req.hamada = 'baicx55plus'
//     req.user = { id: 1, name: "mohamed" }
//     next();
// })


// app.use((req,res,next)=>{
//     console.log('second middleware');
//     next()
// })

// app.get('/users', (req, res) => {
//     console.log(req.hamada);
//     res.send(users);
// })

// app.post('/users', (req, res) => {
//     //    console.log("Body ::: ",req.body);
//     console.log(req.user);
//     users.push(req.body)
//     // users.push({id:2,name:'Khalid'})
//     res.send(users)
// })






//Rest API : Representational state transfer

// /users
// 1. use resource (get,post,patch,delete)
// 2. plural صيغة الجمع
// 3.depend on http method
// 4.stateless request contain all necessary information to process it (token)
// 5.use query string for filtration and pagination page:1 active :true
// 6.json format (javascript object notation)

//Routing : organize the structue of the project file