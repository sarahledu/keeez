const express = require("express");
const router = new express.Router();

router.get("/pro/contact", (req, res) => {
  res.render("pro/contact");
});

module.exports = router;
