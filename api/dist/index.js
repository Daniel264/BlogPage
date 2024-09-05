"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Picture = require("./models/Picture");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
require("ts-node/register");
require("tsconfig-paths/register");
const mongoURI = process.env.MONGODB_URI;
const secret = process.env.JWT_SECRET;
const mongoose = require("mongoose");
const app = (0, express_1.default)();
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
// const multer = require("multer");
const uploadMiddleware = (0, multer_1.default)({ dest: "uploads/" });
const upload = (0, multer_1.default)();
const fs = require("fs");
// const secret = "hhfu8f7djfdlhijsfjuf78g7fvjfg";
app.use((0, cors_1.default)({
    origin: "https://blogpage-frontend.onrender.com", // Allow only your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Include credentials if needed
}));
app.use(express_1.default.json());
app.use(cookieParser());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static(__dirname + "/uploads"));
app.options("*", (0, cors_1.default)());
const salt = bcrypt.genSaltSync(10);
mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 30000,
});
app.get("/", (req, res) => {
    res.send("Welcome to the Backend Server");
});
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const userDoc = yield User.create({
            username,
            email,
            password: bcrypt.hashSync(password, salt),
        });
        res.status(201).json(userDoc);
    }
    catch (e) {
        const errorMessage = e.message || "An unknown error occurred";
        console.error("Registration error:", e);
        res.status(500).json({ message: "Registration failed", error: errorMessage });
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const userDoc = yield User.findOne({ email });
        if (!userDoc) {
            return res.status(404).json({ message: "User not found" });
        }
        const PassOk = bcrypt.compareSync(password, userDoc.password);
        if (PassOk) {
            jwt.sign({ username, email, id: userDoc._id }, secret, {}, (error, token) => {
                if (error)
                    return res.status(400).json({ message: "JWT error", error });
                // Set the session cookie with the correct options
                res.cookie("sessionCookie", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Secure cookie only in production (on https)
                    sameSite: "lax", // Adjust depending on your use case
                });
                // Send a response to the client
                res.json("ok");
            });
        }
        else {
            return res.status(400).json({ message: "Incorrect password" });
        }
    }
    catch (e) {
        const errorMessage = e.message || "An unknown error occurred";
        console.error("Login error:", e);
        res.status(500).json({ message: "Login failed", error: errorMessage });
    }
}));
app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (!token)
        return res.status(401).json({ message: "Not authenticated" });
    jwt.verify(token, secret, {}, (err, info) => {
        if (err)
            throw err;
        res.json(info);
    });
});
app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok");
});
app.post("/post", uploadMiddleware.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const parts = file.originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = `uploads/${file.filename}.${extension}`;
    fs.renameSync(file.path, newPath);
    const { token } = req.cookies;
    if (!token)
        return res.status(401).json({ message: "Not authenticated" });
    jwt.verify(token, secret, {}, (err, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        const { title, summary, content, comment } = req.body;
        const postDoc = yield Post.create({
            title,
            summary,
            content,
            comment,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc);
    }));
}));
app.get("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 });
    res.json(posts);
}));
app.get("/post/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findById(req.params.id).populate("author", [
        "username",
    ]);
    if (!post)
        return res.status(404).json({ message: "Post not found" });
    res.json(post);
}));
app.post("/comment", upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, post_id, author_id } = req.body;
    console.log({ content, post_id, author_id });
    try {
        const commentDoc = yield Comment.create({
            content,
            post: post_id,
            author: author_id,
        });
        res.status(201).json(commentDoc);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create comment", error });
    }
}));
app.get("/comment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield Comment.find();
    res.json(comments);
}));
app.post("/picture", uploadMiddleware.single("picture"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const parts = file.originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = `uploads/${file.filename}.${extension}`;
    fs.renameSync(file.path, newPath);
    const pictureDoc = yield Picture.create({
        picture: newPath,
    });
    res.json(pictureDoc);
}));
app.get("/picture", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const picture = yield Picture.find();
    res.json(picture);
}));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} `));
// eL9wKRx5PyydyqLT
//mongodb+srv://Daniel264:eL9wKRx5PyydyqLT@cluster0.q5k8t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// 2590682f-b507-440d-a2c5-4d61e41b040c
