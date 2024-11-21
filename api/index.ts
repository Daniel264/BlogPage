import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import multer, { Multer } from "multer";
const Post = require("./models/Post");
// const Comment = require("./models/Comment");
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
        // origin: "https://blogpage-frontend.onrender.com",
        origin: true,
        // Allow only your frontend domain
        // methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
        credentials: true, // Include credentials if needed
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.options("*", cors());

const salt = bcrypt.genSaltSync(10);

// mongoose.connect(mongoURI, {
//     serverSelectionTimeoutMS: 30000,
// });

mongoose
    .connect("mongodb://localhost/blog")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(() => console.error("Could not connect to MongoDB..."));

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Backend Server");
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
        const errorMessage =
            (e as Error).message || "An unknown error occurred";
        console.error("Registration error:", e);
        res.status(500).json({
            message: "Registration failed",
            error: errorMessage,
        });
    }
});

app.post("/login", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
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
                        return res
                            .status(400)
                            .json({ message: "JWT error", error });

                    // Set the session cookie with the correct options
                    res.cookie("sessionCookie", token, {
                        httpOnly: true,
                        secure: false,
                        // secure: process.env.NODE_ENV === "production", // Secure cookie only in production (on https)
                        // sameSite:
                        // process.env.NODE_ENV === "production"
                        //     ? "lax"
                        //     : "none", // Adjust depending on your use case
                    });

                    // Send a response to the client
                    res.json("ok");
                },
            );
        } else {
            return res.status(400).json({ message: "Incorrect password" });
        }
    } catch (e) {
        const errorMessage =
            (e as Error).message || "An unknown error occurred";
        console.error("Login error:", e);
        res.status(500).json({ message: "Login failed", error: errorMessage });
    }
});

app.get("/profile", (req: Request, res: Response) => {
    const { sessionCookie } = req.cookies;
    if (!sessionCookie)
        return res.status(401).json({ message: "Not authenticated" });
    jwt.verify(sessionCookie, secret, {}, (err: Error, info: any) => {
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
        const { sessionCookie } = req.cookies;
        if (!sessionCookie)
            return res.status(401).json({ message: "Not authenticated" });
        jwt.verify(sessionCookie, secret, {}, async (err: Error, info: any) => {
            if (err) throw err;

            const { title, summary, content, comment } = req.body;
            const { post_id, author_id } = req.body;
            console.log({ content, post_id, author_id });

            try {
                const commentDoc = await Post.create({
                    comment,
                    post: post_id,
                    author: author_id,
                });
                // res.status(201).json(commentDoc);
                const postDoc = await Post.create({
                    title,
                    summary,
                    content,
                    comment: commentDoc._id,
                    cover: newPath,
                    author: info.id,
                });
                res.status(201).json({ post: postDoc, comment: commentDoc });
            } catch (error) {
                res.status(500).json({
                    message: "Failed to create comment",
                    error,
                });
            }
        });
    },
);

app.get("/post", async (req: Request, res: Response) => {
    const posts = await Post.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 });
    res.json(posts);
});

app.get("/post/:id", async (req: Request, res: Response) => {
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { views: 1 } },
        { new: true }, // This returns the updated document
    ).populate("author", ["username"]);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ post });
});

app.post("/post/:id/comments", async (req: Request, res: Response) => {
    const postId = req.params.id;
    const { content, authorId } = req.body;

    try {
        const post = Post.findByIdAndUpdate(
            postId,
            {
                $push: {
                    comments: {
                        content,
                        author: authorId,
                    },
                },
            },
            { new: true },
        ).populate("comments.author", "username");
        if (!post) return res.status(404).json({ message: "Post not found" });

        res.json(post);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
});

app.put("/post/:id", async (req: Request, res: Response) => {
    console.log("Cookies:", JSON.stringify(req.cookies, null, 2));

    const { sessionCookie } = req.cookies;
    if (!sessionCookie)
        return res.status(401).json({ message: "Not authenticated" });

    jwt.verify(sessionCookie, secret, {}, async (err: Error, info: any) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.author.toString() !== info.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const { title, summary, content } = req.body;
        post.title = title;
        post.summary = summary;
        post.content = content;
        await post.save();
        res.send(post);
    });
});
// app.post("comment", upload.none(), async (req: Request, res: Response) => {
//     const { content, post_id, author_id } = req.body;
//     console.log({ content, post_id, author_id });

//     try {
//         const commentDoc = await Comment.create({
//             content,
//             post: post_id,
//             author: author_id,
//         });
//         res.status(201).json(commentDoc);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to create comment", error });
//     }
// });

// app.get("comment", async (req: Request, res: Response) => {
//     const comments = await Comment.find();
//     res.json(comments);
// });

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
    },
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
