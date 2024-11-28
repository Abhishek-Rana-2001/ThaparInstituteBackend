const express = require("express");
const app = express();
const port = process.env.PORT;
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");
const cors = require("cors");
const path = require("path")

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

connectDB();
app.use(express.json());
app.use("/", async(req,res) => {return res.json("Hello world")})
app.use("/student", studentRoutes);
app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/upload", uploadRoutes);

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);
  
  // Use res.download to force the browser to download the file
  res.download(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to download file', error: err.message });
    }
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started at port :- ${port}`);
});

