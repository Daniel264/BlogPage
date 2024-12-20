import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
    {
        title: String,
        summary: String,
        content: String,
        cover: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comments: [
            {
                content: { type: String, required: true },
                author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        likes: { type: mongoose.Schema.Types.ObjectId },
        views: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
