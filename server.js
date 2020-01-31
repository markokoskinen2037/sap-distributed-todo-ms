require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require("morgan")
const mongoose = require('mongoose')
const todoRouter = require("./routes/todos")

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(morgan("dev"))
app.use(express.json())

// ROUTES:
app.use("/todos", todoRouter)


app.use("/", (req, res) => {
  res.send("Todo microservice")
})
const port = process.env.PORT || 3001
app.listen(port, () => console.log('server started on port', port))