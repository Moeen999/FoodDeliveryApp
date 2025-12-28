import express from "express";
import { addFood, foodList, removeList } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage using multer

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });


foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", foodList);
foodRouter.post("/remove", removeList);

export default foodRouter;
