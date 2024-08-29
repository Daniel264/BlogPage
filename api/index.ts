import express from "express";
import { Request } from "express";
import { Multer } from "multer";
const Post = require("./models/Post");

const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("../api/models/User");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const secret = "hhfu8f7djfdlhijsfjuf78g7fvjfg";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);

mongoose.connect(
  "mongodb+srv://Blog:SZJThMSYPE3FrF5Q@cluster0.n60ur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    serverSelectionTimeoutMS: 30000,
  }
);

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.create({
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    return res.status(404).json({ message: "User not found" });
  }
  const PassOk = bcrypt.compareSync(password, userDoc.password);
  if (PassOk) {
    jwt.sign(
      { email, id: userDoc._id },
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

  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });
  res.json(postDoc);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port} `));

// eL9wKRx5PyydyqLT
//mongodb+srv://Daniel264:eL9wKRx5PyydyqLT@cluster0.q5k8t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// 2590682f-b507-440d-a2c5-4d61e41b040c

// pass
// SZJThMSYPE3FrF5Q
