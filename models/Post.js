const mongoose = require('mongoose');

/**
 * @author Akshay Shahi
 */

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
