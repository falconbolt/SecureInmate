const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const referalCodes = require('referral-codes');
const User = require('../models/User');


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
   const { user_name,facility_name, email, password, role } = req.body;
   
  if (!user_name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    user_name,
    facility_name,
    email,
    role,
    password: hashedPassword,
      });

  console.log(`register info before saving ${newUser}`);

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      _id: savedUser._id,
      user_name: savedUser.user_name,
      email: savedUser.email,
      token: generateToken(savedUser._id),
    });
  } catch (error) {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc  Authenticate a user
// @route  POST /api/users/login
// @access  Public
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
// console.log(password,email)
//   // Check for user email
//   const user = await User.findOne({ email });
//   console.log('user:', user);
// console.log('user.password:', user.password);
//   if (user && (await bcrypt.compare(password, user.password))) {
//     console.log(user);
//     res.json({
//       _id: user.id,
//       user_name: user.user_name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid credentials');
//   }
// });

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
 
};
