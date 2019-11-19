const express = require("express");
const router = new express.Router();
const isLoggedIn = require("./../../middlewares/isLoggedIn");

router.get("/form", isLoggedIn.protectInvestor, (req, res) => {
  res.render("invest/form");
});
router.get("/dashboard", isLoggedIn.protectInvestor, (req, res) => {
  res.render("invest/dashboard");
});
router.post("/dashboard", isLoggedIn.protectInvestor, (req, res) => {
  res.render("invest/dashboard");
});

module.exports = router;
