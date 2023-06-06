import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    
    // Set the token as a cookie in the response
    res.cookie("token", token, {
      httpOnly: true,
      // Other cookie options if needed
    });
    
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password.");
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new Error("Invalid email or password.");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    // Set the token as a cookie in the response
    res.cookie("token", token, {
      httpOnly: true,
      // Other cookie options if needed
    });

    res.json({ token ,message : "Logged in Succesfully"});
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    // const userId = req.params.userId;
    const userId = req.body.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    // Check if the password is being updated
    if (updates.password) {
      // Hash the updated password
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      throw new Error("User not found.");
    }
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found.");
    }
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const logoutUserAccount = async (req, res) => {
  try {
    // Clear the token cookie by setting it to an empty string and an expired date
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.json({ message: 'User logged out successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};