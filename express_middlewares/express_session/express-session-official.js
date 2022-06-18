import parseurl from "parseurl";
import session from "express-session";

export const configExpressSessionOfficialExample = (app) => {
  app.use(
    session({
      secret: "some secret",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 },
    })
  );

  app.use((req, res, next) => {
    if (!req.session.views) {
      req.session.views = {};
    }

    const pathname = parseurl(req).pathname;

    console.log("pathname ", pathname);

    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

    next();
  });

  app.get("/foo", (req, res, next) => {
    res.send(`you viewed this path ${req.session.views["/foo"]} times`);
  });

  app.get("/bar", (req, res, next) => {
    res.send(`you viewed this path ${req.session.views["/bar"]} times`);
  });
};
