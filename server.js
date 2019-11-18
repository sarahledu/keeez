// initial config
require("dotenv").config(); // import all key/value pairs from .env in process.env : really usefull when going online :)
require("./config/mongo"); // database connection setup
require("./utils/hbs_helpers"); // custom functions adding usefull features to hbs templates

// dependencies injection
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const flash = require("connect-flash");
const session = require("express-session");

// ------------------------------------------
// SERVER CONFIG
// ------------------------------------------
const server = express();

// Allow server to parse body from POST Request
server.use(express.urlencoded({ extended: true }));
/**
 *  HEY YOU ! GOOD that you read comments, the line below is MANDATORY :)
 */
// Allow server to parse JSON from AJAX Request
server.use(express.json());

// Make everything inside of public/ available to the browser (styles, images, frontend scripts)
server.use(express.static(path.join(__dirname, "public"))); // rock solid syntax

// indicates express where our "views" templates are located
server.set("views", path.join(__dirname, "views"));
// absolute path to a folder called "views"

// indicates express wich view engine this app will use ; )
server.set("view engine", "hbs");

// set the folder where views-partials will be located
hbs.registerPartials(path.join(__dirname, "views/partials"));

// enable "flash messaging" system
// the depend on session mechanism
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
    // req.session.cookie.expires = new Date(Date.now() + hour)
    // req.session.cookie.maxAge = hour
  })
);

server.use(flash()); // use the flash messages lib
// flash messages last for 1 client/server cycle and are then erased from memory

// Custom middle ware
// every time the server is called through HTTP ...
// this exposeFlashMessage callback will be executed
server.use(function exposeFlashMessage(req, res, next) {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});

//------------------------------------------
// Login
// ------------------------------------------
server.use(function checkLoggedIn(req, res, next) {
  // res.locals.currentUser = req.session.currentUser;
  if (!req.session.currentUser) return next();
  const copy = JSON.parse(JSON.stringify(req.session.currentUser)); // make a clone of db user
  delete copy.password; // remove password from clone
  res.locals.currentUser = copy; // expose to the view template (hbs)
  res.locals.isLoggedIn = Boolean(copy);
  res.locals.isAdmin = Boolean(copy.role && copy.role === "admin");
  next();
});

//------------------------------------------
// SPLITED ROUTING
// ------------------------------------------
const indexRouter = require("./routes/index.js");
const investRouter = require("./routes/invest/invest.js");
const authInvestRouter = require("./routes/invest/auth.js");
const blogRouter = require("./routes/invest/blog.js");
const proRouter = require("./routes/pro/pro.js");
const authProRouter = require("./routes/auth.js/index.js");
const rechercheRouter = require("./routes/pro/search.js/index.js");



server.use(indexRouter);
server.use(investRouter);
server.use("/auth",authInvestRouter);
server.use(blogRouter);
server.use("/auth", authProRouter);
server.use(proRouter);
server.use(rechercheRouter);


server.listen(process.env.PORT, () => {
  console.log(`server runs @ : http://localhost:${process.env.PORT}`);
});
