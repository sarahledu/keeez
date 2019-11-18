const express = require("express");
const router = new express.Router();
const bcrypt = require(process.env.BCRYPT);

// PRO
const proModel = require("../../models/Pro");

//signin routes
router.get("/pro/signin", (req, res) => {
  res.render("auth/pro/signin");
});

router.post("/pro/signin", (req, res) => {
  const user = req.body;
  proModel
    .findOne({ email: user.email })
    .then(dbRes => {
      console.log(dbRes);
      if (!dbRes) {
        return res.render("auth/pro/signin", {
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
        return res.redirect("/pro");
      } else {
        return res.render("auth/pro/signin", {
          msg: { text: "Password is wrong..", status: "wrong" }
        });
      }
    })
    .catch(dbErr => {
      console.log(dbErr);
      res.redirect("/pro/signin");
    });
});

//signup routes
router.get("/pro/signup", (req, res) => {
  res.render("auth/pro/signup");
});
router.post("/pro/signup", (req, res) => {
  const user = req.body;
  proModel
    .findOne({ email: user.email })
    .then(dbRes => {
      if (dbRes)
        return res.render("auth/pro/signup", {
          msg: { text: "This account already exists!", status: "wrong" }
        }); //

      const salt = bcrypt.genSaltSync(10); // cryptography librairie
      const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
      user.password = hashed; // new user is ready for db
      proModel
        .create(user)
        .then(() => res.redirect("/pro/signin"))
        .catch(dbErr => console.log(dbErr));
    })
    .catch(dbErr => next(dbErr));
});

module.exports = router;