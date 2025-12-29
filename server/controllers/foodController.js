import foodModel from "../models/foodModel.js";
import fs from "fs";

// ! Add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured while dding food" });
  }
};

// ! Fetch food items data
const foodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      message: "Items Fetched Succesfully",
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching foods" });
  }
};

// ! remove food item

const removeList = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error deleting the food item" });
  }
};

export { addFood, foodList, removeList };
