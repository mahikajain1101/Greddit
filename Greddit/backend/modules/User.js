const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  followers: {
    type: [String],
  },
  following: {
    type: [String],
  },
  savedpost: {
    type: [String]
  }
  
});


UserSchema.pre('save',async function(next){
    try{
       const salt = await bcrypt.genSalt(10)
       const hashedPass = await bcrypt.hash(this.pass,salt)
       this.pass = hashedPass
       next()
    }
    catch(error){
        next(error)
    }
})

UserSchema.post('save',async function(next){
    try{
        console.log("Called after saving a user")
    }
    catch(error){
        next(error)
    }
})

module.exports = mongoose.model('User', UserSchema);