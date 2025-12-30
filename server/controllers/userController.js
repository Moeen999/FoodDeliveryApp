import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const genToken = (userId) => {
  return jwt.sign({id: userId }, process.env.JWT_SECRET);
};
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // !check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //! validate entered email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    //! validate password strength
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // ? hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ? Create the user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = genToken(user._id);
    res.json({ success: true, message: "User Registered Successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured!" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }
    const passMatched = await bcrypt.compare(password, user.password);
    if (!passMatched) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // ! Authenticate the user
    const token = genToken(user._id);
    res.json({ success: true, message: "User logged In Successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured!" });
  }
};

export { registerUser, loginUser };
