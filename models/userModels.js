const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requiured: [true, 'Please enter a user name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 8
  },
  password_confirm: {
    type: String,
    required: [true, 'Please confirm the password']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
