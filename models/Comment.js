const mongoose = require('mongoose');

/**
 * @author Akshay Shahi
 */

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
