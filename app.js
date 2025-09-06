const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

const TodoRoutes = require("./routes/todoRoutes");
const AuthRoutes = require("./routes/authRoutes");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes app.use('/api', require('route_path'));
app.use(`/api/v1/todos`, TodoRoutes);
app.use(`/api/v1/auth`, AuthRoutes);

module.exports = app;
