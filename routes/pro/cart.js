const express = require("express");
const router = new express.Router();
const proModel = require("./../../models/Pro");

//Stripe dependencies
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(`${stripeSecretKey}`);

//Charge
router.post("/charge", (req, res) => {
  let amount = 500;

  stripe.customers
    .create({
      email: req.session.currentUser.email,
      card: req.body.id
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "eur",
        customer: customer.id
      })
    )
    .then(charge => res.send(charge))
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({ error: "Purchase Failed" });
    });
});

//Router pro
router.get("/pro/cart", (req, res) => {
  res.render("pro/cart", { css: ["cart"] });
});

//Payment goes here!
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
      // (async () => {
      //   const paymentIntent = await stripe.paymentIntents.create({
      //     amount: 1099,
      //     currency: 'eur',
      //   })
      req.session.currentUser = JSON.parse(JSON.stringify(dbRes));
      req.session.currentCart = [];
      res.redirect("/pro/dashboard");
    })
    .catch(err => console.log(err));
});

module.exports = router;
