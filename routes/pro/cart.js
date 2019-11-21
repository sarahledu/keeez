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
      // console.log("AVANT", req.session.currentUser);
      req.session.currentUser = JSON.parse(JSON.stringify(dbRes));
      req.session.currentCart = [];
      console.log(req.session.currentCart, "ici");
      res.redirect("/pro/dashboard");
      // res.locals.currentCart = {
      //   elements: [],
      //   price: 0
      // };
      // console.log("APRES", req.session.currentUser);
    })
    .catch(err => console.log(err));
});

module.exports = router;
