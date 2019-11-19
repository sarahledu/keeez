const express = require("express");
const router = new express.Router();
const isLoggedIn = require("./../../middlewares/isLoggedIn");

//Pro landing page
router.get("/pro/", (req, res) => {
  res.render("pro/index-pro");
});
router.get("/pro/", (req, res) => {
  res.render("pro/index-pro");
});

//Pro dashboard
router.get("/pro/dashboard", isLoggedIn.protectPro, (req, res) => {
  res.render("pro/dashboard", {css: ["filter", "styles"], js: ["script","filter"]});
});
module.exports = router;
