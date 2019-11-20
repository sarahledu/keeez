const express = require("express");
const router = new express.Router();
const isLoggedIn = require("./../../middlewares/isLoggedIn");
const investorModel = require("../../models/Investor");

router.get("/pro/", (req, res) => {
  res.render("pro/index-pro", { css: ["pro"] });
});

router.get("/pro/search", isLoggedIn.protectPro, (req, res) => {
  investorModel
    .find()
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
  console.log("HEYYYYYYY", req.body.objectives);
  var queryObj = {};
  var queryTime = {};
  var queryArea = {};
  if (req.body.objectives.length > 0) {
    queryObj = { objectives: req.body.objectives };
  }
  if (req.body.timeline.length > 0) {
    queryTime = { timeline: req.body.timeline };
  }
  if (req.body.areas.length > 0) {
    queryArea = { areas: req.body.areas };
  }
  investorModel
    .find({
      $and: [queryObj, queryTime, queryArea]
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
