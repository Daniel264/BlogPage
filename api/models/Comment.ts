const mongoose = require("mongoose");
import { model, Schema } from "mongoose";

const CommmentSchema = new Schema({
  comment: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
const CommentModel = model("Comment", CommmentSchema);

module.exports = CommentModel;
