"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    comment: String,
    likes: { type: mongoose_1.default.Schema.Types.ObjectId },
}, {
    timestamps: true,
});
const PostModel = model("Post", PostSchema);
module.exports = PostModel;
