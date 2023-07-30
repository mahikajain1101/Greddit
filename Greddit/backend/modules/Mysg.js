const mongoose = require('mongoose');

const MysgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  tag: {
    type: [String],
    required: true
  },
  bankey: {
    type: [String],
    required: true
  },
 
  author: {
    type: String,
    required: true
  },
  joinedby: {
    type: [String],
  },
  creationtime: {
    type: Date,
    default: new Date()
  },
  joinreq: {
    type: [String]
  }
});

module.exports = mongoose.model('Mysg', MysgSchema);