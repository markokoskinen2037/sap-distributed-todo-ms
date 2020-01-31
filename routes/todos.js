const express = require('express')
const router = express.Router()
const Todo = require("../models/todo")

router.get('/', async (req, res) => {
    try {
        const { user } = req.decoded
        const todos = await Todo.find({ createdBy: user._id })
        res.json(todos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {

    const { user } = req.decoded

    console.log("Adding todo, for user", user._id)

    const todo = new Todo({
        content: req.body.content,
        createdBy: user._id
    })

    try {
        const newTodo = await todo.save()
        res.status(201).json(newTodo)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

module.exports = router