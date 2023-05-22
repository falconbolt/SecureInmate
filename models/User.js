const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
 facility_name: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: true,
  },
   imagePath:{
    type:String,
    required:false
}
  
});

const User = mongoose.model('users', UserSchema, 'Workfily-User');

module.exports = User;
