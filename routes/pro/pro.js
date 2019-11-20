const express = require("express");
const router = new express.Router();
const isLoggedIn = require("./../../middlewares/isLoggedIn");
const investorModel = require("../../models/Investor");

router.get("/pro/", (req, res) => {
  res.render("pro/index-pro", { css: ["pro"] });
});

router.get("/pro/search", isLoggedIn.protectPro, (req, res) => {
  investorModel
    .find({ status: true })
    .then(dbRes => {
      res.render("pro/recherche", {
        investors: dbRes,
        css: ["filter", "styles", "pro"],
        js: ["script", "filter"]
      });
    })
    .catch(e => console.log(e));
});

router.post("/pro/search", isLoggedIn.protectPro, (req, res) => {
  var queryValue = { total_revenue: { $gt: req.body.revenue } };
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
    queryWorks = { construction_works: req.body.construction_works};
  }

  investorModel
    .find({
      $and: [queryObj, queryTime, queryArea, queryWorks, queryValue, { status: true }]
    })
    .then(dbRes => res.send(dbRes))
    .catch();
});

router.get("/pro/dashboard", isLoggedIn.protectPro, (req, res) => {
  res.render("pro/dashboard", {
    css: ["filter", "styles", "pro"],
    js: ["script", "filter"]
  });
});
module.exports = router;
