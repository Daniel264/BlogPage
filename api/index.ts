import express from "express";

const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("../api/models/User");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://Daniel264:eL9wKRx5PyydyqLT@cluster0.q5k8t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.create({ email, password });
  res.json(userDoc);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port} `));

// eL9wKRx5PyydyqLT
//mongodb+srv://Daniel264:eL9wKRx5PyydyqLT@cluster0.q5k8t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
