const todoService = require("../services/todoService");

exports.addTodo = async (req, res) => {
  try {
    const { title, description, startDate, endDate, status, priority } =
      req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!description)
      return res.status(400).json({ message: "Description is required" });
    if (!startDate)
      return res.status(400).json({ message: "Start date is required" });
    if (!endDate)
      return res.status(400).json({ message: "End date is required" });
    if (!status) return res.status(400).json({ message: "Status is required" });
    if (!priority)
      return res.status(400).json({ message: "Priority is required" });

    const data = await todoService.createTodo({
      title,
      description,
      startDate,
      endDate,
      status,
      priority,
    });

    res.status(201).json(data);
  } catch (error) {
    console.log("Error from addTodo controller >>>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos();
    res.status(200).json(todos);
  } catch (error) {
    console.log("error while fetching todos >>>", error);
    res.status(500).json({ message: "Server error", error: error?.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID not found" });
    }

    const data = await todoService.getTodoById(id);
    res.status(200).json(data);
  } catch (error) {
    console.log("error while fetching todo >>>", error.message);
    res.status(500).json({
      message: `Error while fetching todo `,
      error: error.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400) / json({ message: "ID is required" });
    }

    const data = await todoService.deleteTodo(id);
    res.status(200).json(data);
  } catch (error) {
    console.log("error while deleting todo", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const data = await todoService.updateTodo(id, updatedData);

    res.status(200).json(data);
  } catch (error) {
    console.log("err while updating todo from controller >>> ", error);
    res.status(500).json({ error: error.message });
  }
};
