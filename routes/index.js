const express = require("express");
const router = new express.Router();
//HOMEPAGE
router.get("/", (req, res) => {
  res.render("invest/index", { css: ["index"] });
});
//ABOUT
router.get("/about", (req, res) => {
  res.render("about");
});
module.exports = router;
