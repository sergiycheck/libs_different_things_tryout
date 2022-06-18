import express from "express";
// import { configSessionFirst } from "./config_session_first_sample.js";
// import { configReqSession } from "./config_session_req.js";
import { configExpressSessionOfficialExample } from "./express-session-official.js";

//docs
//https://github.com/expressjs/session

const app = express();
const port = 3009;

//the default server side session storage, MemoryStore, is
// purposely not designed for a production environment. It will
// leak memory under most conditions, does not scale past a single
// process, and is meant for debugging and developing
// compatible session stores https://expressjs.com/en/resources/middleware/session.html#compatible-session-stores

// configSessionFirst(app);

// configReqSession(app);

configExpressSessionOfficialExample(app);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "successful response",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
