import session from "express-session";
import { v4 as uuidv4 } from "uuid";

export const configSessionFirst = (app) => {
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: "my secret value",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true, maxAge: 60000 },

      genid: function (req) {
        const uuid = uuidv4();
        console.log("uuid ", uuid);
        return uuid;
      },
    })
  );
};
