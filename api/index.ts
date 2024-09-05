import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import multer, { Multer } from "multer";
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Picture = require("./models/Picture");
import * as dotenv from "dotenv";
dotenv.config();

import "ts-node/register";
import "tsconfig-paths/register";

const mongoURI = process.env.MONGODB_URI;
const secret = process.env.JWT_SECRET;
const mongoose = require("mongoose");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
// const multer = require("multer");
const uploadMiddleware: Multer = multer({ dest: "uploads/" });
const upload = multer();
const fs = require("fs");

// const secret = "hhfu8f7djfdlhijsfjuf78g7fvjfg";

app.use(
  cors({
    origin: "https://blog-page-frontend-woad.vercel.app", // Allow only your frontend domain
    methods: ["GET", "POST"], // Specify allowed methods
    credentials: false, // Include credentials if needed
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.options("*", cors());

const salt = bcrypt.genSaltSync(10);

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 30000,
});

app.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(201).json(userDoc);
  } catch (e) {
    console.error("Registration error:", e);
    res.status(400).json({ message: "Registration failed", error: e.message });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
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
          if (error)
            return res.status(400).json({ message: "JWT error", error });
          res.cookie("token", token).json("ok");
        }
      );
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ message: "Login failed", error: e.message });
  }
});

app.get("/profile", (req: Request, res: Response) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  jwt.verify(token, secret, {}, (err: Error, info: any) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req: Request, res: Response) => {
  res.cookie("token", "").json("ok");
});

app.post(
  "/post",
  uploadMiddleware.single("file"),
  async (req: Request, res: Response) => {
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
  }
);

app.get("/post", async (req: Request, res: Response) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 });
  res.json(posts);
});

app.get("/post/:id", async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id).populate("author", [
    "username",
  ]);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

app.post("/comment", upload.none(), async (req: Request, res: Response) => {
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

app.get("/comment", async (req: Request, res: Response) => {
  const comments = await Comment.find();
  res.json(comments);
});

app.post(
  "/picture",
  uploadMiddleware.single("picture"),
  async (req: Request, res: Response) => {
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
  }
);

app.get("/picture", async (req: Request, res: Response) => {
  const picture = await Picture.find();
  res.json(picture);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port} `));

// eL9wKRx5PyydyqLT
//mongodb+srv://Daniel264:eL9wKRx5PyydyqLT@cluster0.q5k8t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// 2590682f-b507-440d-a2c5-4d61e41b040c
