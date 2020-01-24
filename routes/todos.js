const express = require('express')
const router = express.Router()
const Todo = require("../models/todo")

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {

    const todo = new Todo({
        content: req.body.content
    })

    try {
        const newTodo = await todo.save()
        res.status(201).json(newTodo)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

module.exports = router


