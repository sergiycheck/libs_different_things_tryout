import session from "express-session";

export const configReqSession = (app) => {
  app.use(
    session({
      secret: "some secret",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 },
    })
  );

  app.get("/view", (req, res, next) => {
    if (req.session.views) {
      req.session.views++;
      res.setHeader("Content-Type", "text/html");
      res.write(`<p> views ${req.session.views} </p>`);
      res.write(`<p> expires in ${req.session.cookie.maxAge / 1000} s </p>`);
      res.end();
    } else {
      req.session.views = 1;
      res.end("welcome to the session demo. refresh!");
    }
  });
};

// Session.regenerate(callback)

// req.session.regenerate(function(err) {
//   // will have a new session here
// })

// req.session.destroy(function(err) {
//   // cannot access session here
// })

// there are some cases where it is useful to call this method
//for example, redirects, long-lived requests or in WebSockets.
// req.session.save(function(err) {
//   // session saved
// })

//Session.touch()
// Updates the .maxAge property.

//req.session.id

//req.session.cookie

//Cookie.maxAge
//req.session.cookie.maxAge //return the time remaining in milliseconds

//var hour = 3600000
// req.session.cookie.expires = new Date(Date.now() + hour)
// req.session.cookie.maxAge = hour

// Cookie.originalMaxAge
// The req.session.cookie.originalMaxAge property returns the original maxAge (time-to-live),

// req.sessionID
// To get the ID of the loaded session, access the request property req.sessionID.

// Session Store Implementation
// Every session store must be an EventEmitter and implement specific methods.

//store.all(callback)

//destroy/delete a session from the store given a session id
//store.destroy(sid, callback)

//store.clear(callback)
//This optional method is used to delete all sessions from the store.

// store.length(callback)
// This optional method is used to get the count of all sessions in the store

//store.get(sid, callback)
//This required method is used to get a session from the store given a session ID (sid).

//store.set(sid, session, callback)
//This required method is used to upsert a session into the store given a session ID

//store.touch(sid, session, callback)

//This recommended method is used to "touch" a given session given a session ID (sid) and session (session) object. The callback should be called as callback(error) once the session has been touched.

//This is primarily used when the store will automatically delete idle sessions and this method is used to signal to the store the given session is active, potentially resetting the idle timer.

// connect-mongo
// https://www.npmjs.com/package/connect-mongo

//connect-redis
//https://www.npmjs.com/package/connect-redis
