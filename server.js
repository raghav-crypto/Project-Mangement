const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const morgan = require("morgan");
const userRouter = require("./Routes/user");
const authRouter = require("./Routes/Auth");
const projectRouter = require("./Routes/Project");

// Connect Database
connectDB();

// Initialilze Middleware
app.use(express.json({ extended: false }));

// Middlewares
app.use(morgan("dev"));

//Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);

app.get("/", (req, res) => {
  res.status(201).json({ msg: "Happy Routes" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
