const express = require("express");
const router = new express.Router();

// PRO
const proModel = require("./../models/Pro");

//signin routes
router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

router.post("/signin", (req, res, next) => {
  const user = req.body;
  proModel
    .findOne({ email: user.email })
    .then(dbRes => {
      console.log(dbRes);
      if (!dbRes) {
        return res.render("signin", {
          msg: {
            text: "This user account has not been found..",
            status: "wrong"
          }
        });
      }
      // user has been found in DB !
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        req.session.currentUser = dbRes;
        console.log(req.session.currentUser);
        return res.redirect("/");
      } else {
        return res.render("signin", {
          msg: { text: "Password is wrong..", status: "wrong" }
        });
      }
    })
    .catch(dbErr => {
      console.log(dbErr);
      res.redirect("/signin");
    });
});

//signup routes
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});
router.post("/signup", (req, res) => {
  const user = req.body;
  proModel
    .findOne({ email: user.email })
    .then(dbRes => {
      if (dbRes)
        return res.render("signup", {
          msg: { text: "This account already exists!", status: "wrong" }
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

module.exports = router;
