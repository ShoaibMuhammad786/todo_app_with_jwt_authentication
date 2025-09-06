const express = require("express");
const {
  addTodo,
  getTodos,
  getTodoById,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(`/todo`, authMiddleware, addTodo);
router.get(`/`, authMiddleware, getTodos);
router.get(`/:id`, authMiddleware, getTodoById);
router.delete(`/:id`, authMiddleware, deleteTodo);
router.put(`/:id`, authMiddleware, updateTodo);

module.exports = router;
