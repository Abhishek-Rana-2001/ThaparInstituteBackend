const express = require("express");
const app  = express()
const port  = process.env.PORT 
const studentRoutes = require("./routes/studentRoutes")
const authRoutes = require("./routes/authRoutes")
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");

connectDB()
app.use(express.json())
app.use("/" , studentRoutes)
app.use("/auth",authRoutes )

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server started at port :- ${port}`)
})