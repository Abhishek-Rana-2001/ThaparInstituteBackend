const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// SignUp Controller
const RegisterUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  // checking if any required field is empty
  if (!username || !email || !password) {
    res.status(400).json({ message: "All fields required" });
    return;
  }

  // Check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ message: "User Already Exists" });
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  try {
    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    if (newUser) {
      res.status(201).json({ message: "User  created successfully" });
    } else {
      res.status(400);
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Login Controller

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ message: "All fields required" });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res
    .status(200)
    .json({ user : {id: user._id, username:user.username, role:user.role}, token });
};

module.exports = {
  RegisterUser,
  LoginUser,
};
