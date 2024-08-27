import express from "express";

const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("../api/models/User");
const bcrypt = require("bcryptjs");
const secret = "hhfu8f7djfdlhijsfjuf78g7fvjfg";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

const salt = bcrypt.genSaltSync(10);

mongoose.connect(
  "mongodb+srv://Daniel264:eL9wKRx5PyydyqLT@cluster0.q5k8t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port} `));

// eL9wKRx5PyydyqLT
//mongodb+srv://Daniel264:eL9wKRx5PyydyqLT@cluster0.q5k8t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// 2590682f-b507-440d-a2c5-4d61e41b040c
