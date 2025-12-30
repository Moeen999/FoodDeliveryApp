import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello Ghareeb Nawaz");
});

// DB Connection
connectDB();

//   API endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`Server is running at localhost://${PORT}`);
});
