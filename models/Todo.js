const mongoose = require('mongoose');

/**
 * @author Akshay Shahi
 */

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true
    },
    is_completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', PostSchema);
