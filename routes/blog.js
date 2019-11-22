const express = require("express");
const router = new express.Router();

router.get("/blog", (req, res) => {
  res.render("blog", { css: ["blog"] });
});

module.exports = router;
