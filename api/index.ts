import { log } from "console";
import express from "express";
import { Request } from "express";
import { Multer } from "multer";
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Picture = require("./models/Picture");

const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("../api/models/User");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const upload = multer();
const fs = require("fs");

const secret = "hhfu8f7djfdlhijsfjuf78g7fvjfg";

app.use(cors({ credentials: true, methods: ["POST", "GET"], origin: "https://blog-page-frontend-liart.vercel.app" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.options('*', cors()); // Handle preflight requests


const salt = bcrypt.genSaltSync(10);

mongoose.connect(
  "mongodb+srv://Blog:SZJThMSYPE3FrF5Q@cluster0.n60ur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    serverSelectionTimeoutMS: 30000,
  }
);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    return res.status(404).json({ message: "User not found" });
  }
  const PassOk = bcrypt.compareSync(password, userDoc.password);
  if (PassOk) {
    jwt.sign(
      { username, email, id: userDoc._id },
      secret,
      {},
      (error: Error | null, token: string | undefined) => {
        if (error) return res.status(400).json({ message: "JWT error", error });
        res.cookie("token", token).json("ok");
      }
    );
  } else {
    return res.status(400).json({ message: "Incorrect password" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  jwt.verify(token, secret, {}, (err: Error, info: any) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const file = req.file as Express.Multer.File | undefined;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const parts = file.originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = `uploads/${file.filename}.${extension}`;
  fs.renameSync(file.path, newPath);
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  jwt.verify(token, secret, {}, async (err: Error, info: any) => {
    if (err) throw err;

    const { title, summary, content, comment } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      comment,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 });
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", [
    "username",
  ]);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

app.post("/comment", upload.none(), async (req, res) => {
  const { content, post_id, author_id } = req.body;
  console.log({ content, post_id, author_id });

  try {
    const commentDoc = await Comment.create({
      content,
      post: post_id,
      author: author_id,
    });
    res.status(201).json(commentDoc);
  } catch (error) {
    res.status(500).json({ message: "Failed to create comment", error });
  }
});

app.get("/comment", async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

app.post("/picture", uploadMiddleware.single("picture"), async (req, res) => {
  const file = req.file as Express.Multer.File | undefined;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const parts = file.originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = `uploads/${file.filename}.${extension}`;
  fs.renameSync(file.path, newPath);

  const pictureDoc = await Picture.create({
    picture: newPath,
  });
  res.json(pictureDoc);
});

app.get("/picture", async (req, res) => {
  const picture = await Picture.find();
  res.json(picture);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port} `));

// eL9wKRx5PyydyqLT
//mongodb+srv://Daniel264:eL9wKRx5PyydyqLT@cluster0.q5k8t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// 2590682f-b507-440d-a2c5-4d61e41b040c

// pass
// SZJThMSYPE3FrF5Q
