import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

const port = 3009;

app.get("/", (req, res) => {
  console.log(`Cookies:`, req.cookies);
  console.log(`Signed cookies:`, req.signedCookies);

  res.status(200).json({
    message: "successful response",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
