const express = require("express");
const router = new express.Router();
const proModel = require("./../../models/Pro");
router.get("/pro/cart", (req, res) => {
  res.render("pro/cart", { css: ["cart"] });
});

router.get("/pro/checkout/:id", (req, res) => {
  proModel
    .findOneAndUpdate(
      req.params.id,
      {
        $addToSet: { form_bought: { $each: req.session.currentCart } }
      },
      { new: true }
    )
    .then(dbRes => {
      req.session.currentUser = JSON.parse(JSON.stringify(dbRes));
      req.session.currentCart = [];
      res.redirect("/pro/dashboard");
    })
    .catch(err => console.log(err));
});

module.exports = router;
