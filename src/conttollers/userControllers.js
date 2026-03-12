const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return JWT.sign(
    { id }, // payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: "7d" }, // token expiry
  );
};

// Register
const register = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    // Fill all fields
    if (!email || !username || !password || !confirmPassword) {
      return res.status(400).json({ message: "Pls fill all fileds" });
    }

    // Check Password
    if (password != confirmPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Response
    res.status(201).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", err: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Fill all fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Pls enter your email and password" });
    }

    // Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Response
    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login };
