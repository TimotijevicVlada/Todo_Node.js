const router = require("express").Router();
const Todo = require("../models/Todo");

//CREATE TODO
router.post("/createTodo", async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
        const savedTodo = await newTodo.save();
        res.status(200).json(savedTodo)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE TODO
router.put("/updateTodo", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true })
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json(error);
    }
})

//DELETE TODO
router.delete("/deleteTodo", async (req, res) => {
    try {
        const deleteTodo = await Todo.findByIdAndDelete(req.body._id);
        res.status(200).json(deleteTodo);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET ALL TODOS
router.get("/getAllTodos", async (req, res) => {
    try {
        const getAllTodos = await Todo.find();
        res.status(200).json(getAllTodos);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET SINGLE TODO
router.get("/getSingleTodo", async (req, res) => {
    try {
        const getTodo = await Todo.findById(req.body._id);
        res.status(200).json(getTodo);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;