import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PictureSchema = new Schema({
  picture: String,
});

const Picture = model("Picture", PictureSchema);

module.exports = Picture;
