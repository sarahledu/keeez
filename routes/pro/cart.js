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
      console.log(dbRes);
    })
    .catch(err => console.log(err));
  res.redirect("/pro/dashboard");
});

module.exports = router;
