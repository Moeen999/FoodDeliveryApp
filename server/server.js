import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
const app = express();


app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello Ghareeb Nawaz");
});

// DB Connection 
  connectDB()
app.listen(PORT, () => {
  console.log(`Server is running at localhost://${PORT}`);
});
