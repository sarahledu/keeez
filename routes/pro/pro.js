const express = require("express");
const router = new express.Router();
const isLoggedIn = require("./../../middlewares/isLoggedIn");
const investorModel = require("../../models/Investor");
const proModel = require("../../models/Pro");

router.get("/pro/", (req, res) => {
  res.render("pro/index-pro", { css: ["pro", "landing-pro"] });
});

router.get("/pro/search", isLoggedIn.protectPro, (req, res) => {
  proModel
    .findById(req.session.currentUser._id)
    .then(currentUser => {
      investorModel
        .find({
          $and: [{ status: true }, { _id: { $nin: currentUser.form_bought } }]
        })
        .then(dbRes => {
          console.log(dbRes);
          res.render("pro/recherche", {
            investors: dbRes,
            css: ["filter", "styles", "pro"],
            js: ["filter", "cart"]
          });
        })
        .catch(e => console.log(e));
    })
    .catch(err => console.log(err));
});

router.post("/pro/search", isLoggedIn.protectPro, (req, res) => {
  var queryValue = { total_revenue: { $gt: req.body.revenue } };
  var queryBudget = { budget: { $gt: req.body.budgeto } };
  var queryObj = {};
  var queryTime = {};
  var queryArea = {};
  var queryWorks = {};
  if (req.body.objectives.length > 0) {
    queryObj = { objectives: req.body.objectives };
  }
  if (req.body.timeline.length > 0) {
    queryTime = { timeline: req.body.timeline };
  }
  if (req.body.areas.length > 0) {
    queryArea = { areas: req.body.areas };
  }
  if (req.body.construction_works.length > 0) {
    queryWorks = { construction_works: req.body.construction_works };
  }
  investorModel
    .find({
      $and: [
        queryObj,
        queryTime,
        queryArea,
        queryWorks,
        queryValue,
        queryBudget,
        { status: true },
        { _id: { $nin: req.session.currentUser.form_bought } }
      ]
    })
    .then(dbRes => {
      res.send(dbRes);
    })
    .catch();
});

router.post("/pro/search/contacts", isLoggedIn.protectPro, (req, res) => {
  var queryValue = { total_revenue: { $gt: req.body.revenue } };
  var queryBudget = { budget: { $gt: req.body.budgeto } };
  var queryObj = {};
  var queryTime = {};
  var queryArea = {};
  var queryWorks = {};

  // var elmtAvailable = { _id: { $nin: req.session.currentUser.form_bought } };
  if (req.body.objectives.length > 0) {
    queryObj = { objectives: req.body.objectives };
  }
  if (req.body.timeline.length > 0) {
    queryTime = { timeline: req.body.timeline };
  }
  if (req.body.areas.length > 0) {
    queryArea = { areas: req.body.areas };
  }
  if (req.body.construction_works.length > 0) {
    queryWorks = { construction_works: req.body.construction_works };
  }
  proModel
    .findById(req.session.currentUser._id)
    .then(dbProRes => {
      investorModel
        .find({
          $and: [
            queryObj,
            queryTime,
            queryArea,
            queryWorks,
            queryValue,
            queryBudget,
            { status: true },
            { _id: dbProRes.form_bought }
          ]
        })
        .then(dbRes => {
          console.log(dbRes);
          res.send(dbRes);
        })
        .catch();
    })
    .catch();
});

router.get("/pro/dashboard", isLoggedIn.protectPro, (req, res) => {
  proModel
    .findById(res.locals.currentUser._id)
    .then(dbResPro => {
      investorModel
        .find({ _id: dbResPro.form_bought })
        .then(dbResInv => {
          res.render("pro/dashboard", {
            investors: dbResInv,
            css: ["filter", "styles", "pro"],
            js: ["script", "filter-buy"]
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});
router.get("/pro/dashboard/test", isLoggedIn.protectPro, (req, res) => {
  proModel
    .findById(res.locals.currentUser._id)
    .then(dbResPro => {
      investorModel
        .find({ _id: dbResPro.form_bought })
        .then(dbResInv => {
          console.log(dbResInv);
          res.send(dbResInv);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.get("/pro/get-cart", (req, res) => {
  if (req.session.currentCart) res.send({ cart: req.session.currentCart });
  else res.send({ cart: [] });
});

router.post("/pro/search/add/:id", isLoggedIn.protectPro, (req, res) => {
  const cart = req.session.currentCart;
  // var cartNumber = cart.length;
  if (!cart.includes(`${req.params.id}`)) {
    cart.push(req.params.id);
  }

  res.send({ cart: cart });
});

router.post("/pro/contact", (req, res) => {
  res.redirect("/pro");
});
module.exports = router;
