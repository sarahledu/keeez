const express = require("express");
const router = new express.Router();
const isLoggedIn = require("./../../middlewares/isLoggedIn");
const isFormFilled = require("./../../middlewares/isFormFilled");
// INVESTOR
const investorModel = require("../../models/Investor");

//Form
router.get("/form", isLoggedIn.protectInvestor, (req, res) => {
  // console.log(req.session.currentUser);
  res.render("invest/form", { user: req.session.currentUser, css: ["form"] });
});

router.post("/form", isLoggedIn.protectInvestor, (req, res) => {
  const user = req.session.currentUser;
  const newInfo = req.body;
  investorModel
    .findOneAndUpdate(user, newInfo, { new: true })
    .then(dbRes => {
      req.session.currentUser = dbRes;
      if (
        newInfo.marital_status !== "Chose" &&
        newInfo.nbr_child !== 0 &&
        newInfo.total_revenue !== 0 &&
        newInfo.monthly_savings !== 0 &&
        newInfo.revenue_taxes !== 0 &&
        newInfo.objectives !== "Chose" &&
        newInfo.construction_works !== "Chose" &&
        newInfo.areas !== "Chose" &&
        newInfo.timeline !== "Chose"
      ) {
        console.log("------ I just landed in the if");
        investorModel
          .findByIdAndUpdate(
            user._id,
            { $set: { status: true } },
            { new: true }
          )
          .then(dbRes => {
            req.session.currentUser = dbRes;
            res.redirect("/dashboard");
          })
          .catch(err => console.log(err));
      } else {
        res.redirect("/form");
      }
    })
    .catch(err => console.log(err));
});

router.get(
  "/dashboard",
  isLoggedIn.protectInvestor,
  isFormFilled,
  (req, res) => {
    res.render("invest/dashboard");
  }
);
router.post("/dashboard", isLoggedIn.protectInvestor, (req, res) => {
  res.render("invest/dashboard");
});

module.exports = router;
