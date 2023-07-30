const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  text: {
      type: String,
      required: true
  },
  postedby: {
    type: String,
    required: true
  },
  postedin: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  upvotedby: {
    type: [String]
  },
  downvotedby: {
    type: [String]
  },
  downvotes: {
    type: Number,
    default: 0
  },
  comment: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Post', PostSchema);