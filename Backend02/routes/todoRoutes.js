const express = require("express");

// import controller
const { createTodo, getTodo, getTodoByID, updateTodo, deleteTodo } = require("../controllers/TodoControllers");

// creating Router object using express
const router = express.Router();

//define Routes API

router.post("/createTodo", createTodo);
router.get("/getTodos", getTodo);
router.get("/getTodos/:id", getTodoByID);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);
module.exports = router;
