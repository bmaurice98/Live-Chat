const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("This email is already in use");
  }

  const user = await User.create({
    name,
    email,
    password,
    image,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create User");
  }
});

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the Fields");
  }

  const user = await User.findOne({ email });

  if (user && (await user.verifyPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//Uses queries to perform searches
const allUsers = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
