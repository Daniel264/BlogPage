const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // profilePicture: { type: String, required: false },
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
