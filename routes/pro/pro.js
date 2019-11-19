const express = require("express");
const router = new express.Router();
const isLoggedIn = require("./../../middlewares/isLoggedIn");

router.get("/pro/", (req, res) => {
  res.render("pro/index-pro", {css: ["pro"]});
});

router.get("/pro/dashboard", isLoggedIn.protectPro, (req, res) => {
  res.render("pro/dashboard", {css: ["filter", "styles", "pro"], js: ["script","filter"]});
});
module.exports = router;
