import express from "express";

const app = express();

app.get("/test", (req, res) => {
  res.json("success");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port} `));
