const mongoose = require('mongoose');

/**
 * @author Akshay Shahi
 */

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
