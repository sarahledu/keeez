const express = require("express");
const router = new express.Router();
const proModel = require("./../../models/Pro");

//Router pro
router.get("/pro/cart", (req, res) => {
  res.render("pro/cart", { css: ["cart"] });
});

//Payment goes here!
router.get("/pro/checkout/:id", (req, res) => {
  console.log("req params id", req.params.id);
  console.log("req session current cart", req.session.currentCart);
  proModel
    .findOneAndUpdate(
      req.params.id,
      {
        $addToSet: { form_bought: { $each: req.session.currentCart } }
      },
      { new: true }
    )
    .then(dbRes => {
      console.log(JSON.parse(JSON.stringify(dbRes)));
      req.session.currentUser = JSON.parse(JSON.stringify(dbRes));
      req.session.currentCart = [];
      res.redirect("/pro/dashboard");
    })
    .catch(err => console.log(err));
});

module.exports = router;
