import mongoose, { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  content: { type: String, required: true },
  // post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment
