import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
    {
        title: String,
        summary: String,
        content: String,
        cover: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        likes: { type: mongoose.Schema.Types.ObjectId },
    },
    {
        timestamps: true,
    },
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
