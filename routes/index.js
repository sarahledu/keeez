const express = require("express");
const router = new express.Router();
//HOMEPAGE
router.get("/", (req, res) => {
  res.render("invest/index", { css: ["index"] });
});

module.exports = router;
