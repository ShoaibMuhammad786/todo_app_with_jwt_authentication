const TodosModel = require("../models/todoModel");

const createTodo = async ({
  title,
  description,
  startDate,
  endDate,
  status,
  priority,
}) => {
  const existingTodo = await TodosModel.findOne({ title });

  if (existingTodo) {
    throw new Error(`Todo already exists with title: ${title}`);
  }

  const todo = await TodosModel.create({
    title,
    description,
    startDate,
    endDate,
    status,
    priority,
  });

  return {
    message: "Todo added successfully!",
    data: todo,
  };
};

const getTodos = async () => {
  const todos = await TodosModel.find();
  if (todos.length > 0) {
    return todos;
  }

  return {
    message: "Todos not found",
  };
};

const getTodoById = async (id) => {
  const todo = await TodosModel.findById({ _id: id });
  if (!todo) {
    throw new Error("Todo not found");
  }

  return {
    message: "Todo fetched successfully!",
    data: todo,
  };
};

const deleteTodo = async (id) => {
  const todo = await TodosModel.findById(id);
  if (!todo) {
    throw new Error("Todo not found");
  }

  await TodosModel.findByIdAndDelete(id);

  return {
    message: "Todo deleted successfully",
  };
};

const updateTodo = async (id, updatedData) => {
  const todo = await TodosModel.findById(id);
  if (!todo) {
    throw new Error("Todo not found");
  }
  const updatedTodo = await TodosModel.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true, runValidators: true }
  );

  return {
    message: "Todo updated successfully",
    data: updatedTodo,
  };
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  deleteTodo,
  updateTodo
};
