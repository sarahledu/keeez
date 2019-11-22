// initial config
require("dotenv").config(); // import all key/value pairs from .env in process.env : really usefull when going online :)
require("./config/mongo"); // database connection setup
require("./utils/hbs_helper");

//Stripe keys
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// dependencies injection
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const stripe = require("stripe")(`${stripeSecretKey}`);
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");

// ------------------------------------------
// SERVER CONFIG
// ------------------------------------------
const server = express();

// Allow server to parse body from POST Request
server.use(express.urlencoded({ extended: true }));

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
    cookie: { maxAge: 6000000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    saveUninitialized: true,
    resave: true
  })
);

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
  // Use this line to check the user status in HBS
  console.log(req.session.currentCart, "");
  if (req.session.currentCart) {
    res.locals.currentCart = {
      elements: req.session.currentCart,
      price: req.session.currentCart.length * 10
    };
  }
  res.locals.ifFormedFilled = copy.status;
  res.locals.userType = copy.type;
  next();
});

//------------------------------------------
// SPLITED ROUTING
// ------------------------------------------

// INVESTOR ROUTING
const indexRouter = require("./routes/index.js");
const investRouter = require("./routes/invest/invest.js");
const authInvestorRouter = require("./routes/invest/auth-invest.js");
const blogRouter = require("./routes/blog.js");

// PRO ROUTING
const proRouter = require("./routes/pro/pro.js");
const contactRouter = require("./routes/pro/contact.js");
const authProRouter = require("./routes/pro/auth-pro.js");
const cartRouter = require("./routes/pro/cart.js");

server.use(indexRouter);
server.use(investRouter);
server.use(authInvestorRouter);
server.use(authProRouter);
server.use(blogRouter);
server.use(proRouter);
server.use(contactRouter);
server.use(cartRouter);

server.listen(process.env.PORT, () => {
  console.log(`server runs @ : http://localhost:${process.env.PORT}`);
});
