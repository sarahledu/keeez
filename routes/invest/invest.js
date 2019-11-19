const express = require("express");
const router = new express.Router();
const isLoggedIn = require("./../../middlewares/isLoggedIn");

// INVESTOR
const investorModel = require("../../models/Investor");

//Form
router.get("/form", isLoggedIn.protectInvestor, (req, res) => {
  res.render("invest/form", { user: req.session.currentUser });
});

router.post("/form", isLoggedIn.protectInvestor, (req, res) => {
  const user = req.session.currentUser;
  const newInfo = req.body;
  investorModel
    .findOneAndUpdate(user, newInfo, { new: true })
    .then(dbRes => {
      req.session.currentUser = dbRes;
      if (user.status === false) {
        res.redirect("/form");
      } else {
        res.redirect("/dashboard");
      }
    })
    .catch(err => console.log(err));
});

router.get("/dashboard", isLoggedIn.protectInvestor, (req, res) => {
  res.render("invest/dashboard");
});
router.post("/dashboard", isLoggedIn.protectInvestor, (req, res) => {
  res.render("invest/dashboard");
});

module.exports = router;
