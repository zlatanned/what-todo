const mongoose = require('mongoose');

/**
 * @author Akshay Shahi
 */

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true
    },
    post_id: {
      type: String
    },
    created_by: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
