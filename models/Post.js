const mongoose = require('mongoose');

/**
 * @author Akshay Shahi
 */

const PostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    created_by: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
