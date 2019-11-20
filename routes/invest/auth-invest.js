const express = require("express");
const router = new express.Router();
const bcrypt = require(process.env.BCRYPT);

// INVESTOR
const investorModel = require("../../models/Investor");
//signin routes
router.get("/signin", (req, res) => {
  res.render("auth/investor/signin", { css: ["signin"] });
});

router.post("/signin", (req, res) => {
  const user = req.body;
  investorModel
    .findOne({ email: user.email })
    .then(dbRes => {
      if (!dbRes) {
        return res.render("auth/investor/signin", {
          msg: {
            text: "This user account has not been found..",
            status: "wrong"
          }
        });
      }
      // user has been found in DB !
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        req.session.currentUser = dbRes;
        if (dbRes.status === false) {
          return res.redirect("/form");
        } else {
          return res.redirect("/dashboard");
        }
      } else {
        return res.render("auth/investor/signin", {
          msg: { text: "Password is wrong..", status: "wrong" }
        });
      }
    })
    .catch(dbErr => {
      res.redirect("/signin");
    });
});

//signup routes
router.get("/signup", (req, res) => {
  res.render("auth/investor/signup");
});
router.post("/signup", (req, res) => {
  const user = req.body;
  investorModel
    .findOne({ email: user.email })
    .then(dbRes => {
      if (dbRes)
        return res.render("auth/investor/signup", {
          msg: { text: "This account already exists!", status: "wrong" }, css: ["signup"]
        }); //

      const salt = bcrypt.genSaltSync(10); // cryptography librairie
      const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
      user.password = hashed; // new user is ready for db
      investorModel
        .create(user)
        .then(() => res.redirect("/signin"))
        .catch(dbErr => console.log(dbErr));
    })
    .catch(dbErr => next(dbErr));
});

//logout route
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.locals.isLoggedIn = undefined;
    res.redirect("/signin");
  });
});

module.exports = router;
