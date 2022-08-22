const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  user_type: String,
  wish_list: [],
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;