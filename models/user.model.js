const mongoose = require("mongoose");

const UserSchema =  mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  gender:{
    type:String,
    enum:["male", "female"]
  }
},{timestamps:true});



const User = mongoose.model("User", UserSchema);

module.exports = User;
