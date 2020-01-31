require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require("morgan")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const todoRouter = require("./routes/todos")

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(morgan("dev"))
app.use(express.json())

const decodeToken = (req, res, next) => {
    let result;
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = {
        expiresIn: '2d',
        issuer: 'sap-todo'
    };
    try {
        req.decoded = jwt.verify(token, process.env.JWT_SECRET, options);
        next();
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

app.use((req, res, next) => {
    decodeToken(req, res, next)
})

// ROUTES:
app.use("/todos", todoRouter)


app.use("/", (req, res) => {
    res.send("Todo microservice")
})
const port = process.env.PORT || 3001
app.listen(port, () => console.log('server started on port', port))