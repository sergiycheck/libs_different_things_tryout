import express from "express";

const app = express();

const port = 3009;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "successful response",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
