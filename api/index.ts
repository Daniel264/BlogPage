import express, { Request, Response } from "express";
import multer, { Multer } from "multer";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import "ts-node/register";
import "tsconfig-paths/register";

const app = express();
const upload = multer({ dest: "uploads/" });

const mongoURI = process.env.MONGODB_URI!;
const secret = process.env.JWT_SECRET!;

// Import your models
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Picture = require("./models/Picture");
const User = require("../api/models/User");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));

const salt = bcrypt.genSaltSync(10);

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 30000,
});

app.post("/register", async (req: Request, res: Response) => {
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

app.post("/login", async (req: Request, res: Response) => {
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
  upload.single("file"),
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
  upload.single("picture"),
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

app.listen(port, () => console.log(`listening on port ${port}`));
