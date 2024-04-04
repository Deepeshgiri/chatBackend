const express = require("express");

const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const messageRoutes = require("./routes/messageRoutes");

const connectDB = require("./db/dbConnection");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({origin:true, credentials:true}));
app.use(morgan("short"));
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use('/api/message' , messageRoutes);
app.use('/api/users' , userRoutes);

app.get('/test' , (req, res)=>{
  res.cookie("test" , "wallahahabibi")
  res.send(" habibi, I am a happy server!!!!")
})

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running at ${PORT}`);
});
