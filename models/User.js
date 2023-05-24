const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  facility_name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    // minlength: 6,
    // select: false,
    // resetPasswordToken: String,
    // resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      Default: Date.now,
    },
  },
  role: {
    type: String,
    enum: ['user', 'editor'],
  },

});

const User = mongoose.model('users', UserSchema,'úsers');

module.exports = User;
