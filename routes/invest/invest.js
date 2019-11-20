const express = require("express");
const router = new express.Router();
const isLoggedIn = require("./../../middlewares/isLoggedIn");
const isFormedFilled = require("./../../middlewares/isFormFilled");
// INVESTOR
const investorModel = require("../../models/Investor");

//Form
router.get("/form", isLoggedIn.protectInvestor, (req, res) => {
  console.log(req.session.currentUser);
  res.render("invest/form", { user: req.session.currentUser, css: ["form"] });
});

router.post("/form", isLoggedIn.protectInvestor, isFormedFilled, (req, res) => {
  const user = req.session.currentUser;
  const newInfo = req.body;
  investorModel
    .findOneAndUpdate(user, newInfo, { new: true })
    .then(dbRes => {
      console.log(dbRes);
      req.session.currentUser = dbRes;
      res.redirect("/form");
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
