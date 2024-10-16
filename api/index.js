const express = require("express");
const app = express();
const port = process.env.PORT;
const studentRoutes = require("../routes/studentRoutes");
const authRoutes = require("../routes/authRoutes");
const courseRoutes = require("../routes/courseRoutes");
const connectDB = require("../config/db");
const errorHandler = require("../middlewares/errorMiddleware");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

connectDB();
app.use(express.json());
app.use("/", studentRoutes);
app.use("/auth", authRoutes);
app.use("/course", courseRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started at port :- ${port}`);
});

module.exports = app;
