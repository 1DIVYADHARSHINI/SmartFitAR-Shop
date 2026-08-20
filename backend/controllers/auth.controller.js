import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Signup successful. Please login." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ❌ Remove password before sending response
    const { password: pwd, ...userData } = user._doc;

    res.json({
      message: "Login successful",
      user: userData, // ✅ contains name & email only
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
