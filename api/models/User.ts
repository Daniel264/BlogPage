const mongoose = require("mongoose");
const { model } = mongoose;

const userSchema = new mongoose.Schema({
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
