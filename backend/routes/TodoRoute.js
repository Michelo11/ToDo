const { Router } = require("express");
const { authentication } = require("../middleware");
const User = require("../models/User");
const Todo = require("../models/Todo");

const router = Router();

router.get("/", authentication, async (req, res) => {
    const todos = await Todo.find({owner: req.token.user}).exec();

    res.json({
        todos: todos
    });
});

router.put("/", authentication, async (req, res) => {
    const {title} = req.query;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const user = await User.findOne({username: req.token.user}).exec();

    if (!user.todos) {
        user.todos = [];
    }

    const todo = await new Todo({
        title: title,
        completed: false,
        owner: user.username
    }).save();

    user.todos.push(todo._id);

    await user.save();

    res.json({
        todos: user.todos
    });
});

router.delete("/", authentication, async (req, res) => {
    const {id} = req.query;

    if (!id) {
        return res.status(400).json({
            message: "Id is required"
        });
    }

    const todo = await Todo.findById(id).exec();

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    if (todo.owner !== req.token.user) {
        return res.status(403).json({
            message: "You are not allowed to delete this todo"
        });
    }

    await todo.remove();

    res.json({
        message: "Todo deleted"
    });
});

router.patch("/", authentication, async (req,res) => {
    const {id, title, completed} = req.body;

    if (!id || !title) {
        return res.status(400).json({
            message: "Id and title are required"
        });
    }

    const todo = await Todo.findById(id).exec();

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    if (todo.owner !== req.token.user) {
        return res.status(403).json({
            message: "You are not allowed to update this todo"
        });
    }

    todo.title = title;
    todo.completed = completed;

    await todo.save();

    res.json({
        message: "Todo updated"
    });
});

module.exports = router;