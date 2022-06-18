import session from "express-session";

export const configSession = (app) => {
  const sess = {
    secret: "my secret",
    cookie: {},
  };

  if (app.get("env") === "production") {
    app.set("trust proxy", 1); //truest first proxy
    sess.cookie.secure = true; // serve secure cookies
  }

  app.use(session(sess));
};
