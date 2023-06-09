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

//COMPLETE TODO
router.put("/completeTodo", async (req, res) => {
    try {
        const completeTodo = await Todo.findByIdAndUpdate(req.body._id, { completed: req.body.completed }, { new: true })
        res.status(200).json(completeTodo);
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

//GET ALL TODOS (OR FILTERED BY COMPLETED/UNCOMPLETED OR SEARCHED BY TITLE)
router.get("/getAllTodos", async (req, res) => {
    const { completed, title } = req.query;    //When it's "GET" method we can take the request props only by "req.query" not by "req.body"
    try {
        let query = {};
        if (title) {
            query.title = { $regex: title, $options: "i" };   // "i" means that it is case insensitive (no matter if it's uppercase or lowercase)
        }
        if (completed !== undefined) {  //it can be true/false/undefined
            query.completed = completed;
        }
        const getAllTodos = await Todo.find(query);
        res.status(200).json(getAllTodos);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET SINGLE TODO
router.get("/getSingleTodo", async (req, res) => {
    const { _id } = req.query;   //When it's "GET" method we can take the request props only by "req.query" not by "req.body"
    try {
        const getTodo = await Todo.findById(_id);
        res.status(200).json(getTodo);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;