const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");
const notifier = require("../observers/Notifier");
const Subscriber = require("../observers/Subscriber");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.warn("Registration attempt for existing user", { email });
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password, role });
    logger.info("User registered successfully", {
      userId: user.id,
      email: user.email,
    });
    res
      .status(201)
      .json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
  } catch (error) {
    logger.error("Error during user registration", {
      email: req.body.email,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      logger.info("User login successful", {
        userId: user.id,
        email: user.email,
      });
      const subscriber = new Subscriber(user.id);
      notifier.addSubscriber(subscriber);
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      logger.warn("Invalid login attempt", { email });
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    logger.error("Error during user login", {
      email: req.body.email,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    logger.info("Profile data fetched", { userId: user.id });
    res.status(200).json({
      name: user.name,
      email: user.email,
      university: user.university,
      address: user.address,
      role: user.role,
    });
  } catch (error) {
    logger.error("Error fetching user profile", {
      userId: req.user.id,
      error: error.message,
    });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, university, address, role } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.university = university || user.university;
    user.address = address || user.address;
    user.role = role || user.role;

    const updatedUser = await user.save();
    logger.info("User profile updated successfully", {
      userId: updatedUser.id,
    });
    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      university: updatedUser.university,
      address: updatedUser.address,
      role: updatedUser.role,
      token: generateToken(updatedUser.id),
    });
  } catch (error) {
    logger.error("Error updating user profile", {
      userId: req.user.id,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, updateUserProfile, getProfile };
