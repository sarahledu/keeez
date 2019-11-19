const express = require("express");
const router = new express.Router();

router.get("/pro/cart", (req, res) => {
  res.render("pro/cart", { css: ["cart"] });
});

module.exports = router;
