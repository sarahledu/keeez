const express = require("express");
const router = new express.Router();
const isLoggedIn = require("./../../middlewares/isLoggedIn");
const isFormFilled = require("./../../middlewares/isFormFilled");
// INVESTOR
const investorModel = require("../../models/Investor");

//Form
router.get("/form", isLoggedIn.protectInvestor, (req, res) => {
  // console.log(req.session.currentUser);
  res.render("invest/form", {
    user: req.session.currentUser,
    css: ["form"],
    js: ["script"]
  });
});

router.get("/form-1", isLoggedIn.protectInvestor, (req, res) => {
  // console.log(req.session.currentUser);
  res.render("invest/form-1", {
    user: req.session.currentUser,
    css: ["form"],
    js: ["script"]
  });
});

router.get("/form-2", isLoggedIn.protectInvestor, (req, res) => {
  // console.log(req.session.currentUser);
  res.render("invest/form-2", {
    user: req.session.currentUser,
    css: ["form"],
    js: ["script"]
  });
});

router.post("/form-1", isLoggedIn.protectInvestor, (req, res) => {
  const user = req.session.currentUser;
  const newInfo = req.body;
  investorModel
    .findOneAndUpdate(user, newInfo, { new: true })
    .then(dbRes => {
      req.session.currentUser = dbRes;
      res.redirect("/form-2");
    })
    .catch(err => console.log(err));
});

router.post("/form-2", isLoggedIn.protectInvestor, (req, res) => {
  const user = req.session.currentUser;

  const newInfo = req.body;
  investorModel
    .findOneAndUpdate(user, newInfo, { new: true })
    .then(dbRes => {
      req.session.currentUser = dbRes;
      page1 =
      user.objectives !== "Choose" &&
        user.construction_works !== "Choose" &&
        user.areas !== "Choose" &&
        user.timeline !== "Choose";
        
      page2 =newInfo.marital_status !== "Choose" &&
      newInfo.total_revenue !== "0" &&
      newInfo.monthly_savings !== "0" &&
      newInfo.revenue_taxes !== "0";
      
        
      if (page1 && page2) {
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
        if (page1) {
          res.redirect("/form-2");
        } else {
          res.redirect("/form-1");
        }
      }
    })
    .catch(err => console.log(err));
});

router.get(
  "/dashboard",
  isLoggedIn.protectInvestor,
  isFormFilled,
  (req, res) => {
    res.render("invest/dashboard",{
      user: req.session.currentUser,
      css: ["dashboard","form"]
    })
   
  }
);
router.post("/dashboard", isLoggedIn.protectInvestor, (req, res) => {
  res.render("invest/dashboard");
});

module.exports = router;

//Just in case:

// router.post("/form-2", isLoggedIn.protectInvestor, (req, res) => {
//   const user = req.session.currentUser;
//   const newInfo = req.body;
//   investorModel
//     .findOneAndUpdate(user, newInfo, { new: true })
//     .then(dbRes => {
//       req.session.currentUser = dbRes;
//       if (
//         newInfo.marital_status !== "Choose" &&
//         newInfo.nbr_child !== 0 &&
//         newInfo.total_revenue !== 0 &&
//         newInfo.monthly_savings !== 0 &&
//         newInfo.revenue_taxes !== 0 &&
//         newInfo.objectives !== "Choose" &&
//         newInfo.construction_works !== "Choose" &&
//         newInfo.areas !== "Choose" &&
//         newInfo.timeline !== "Choose"
//       ) {
//         console.log("------ I just landed in the if");
//         investorModel
//           .findByIdAndUpdate(
//             user._id,
//             { $set: { status: true } },
//             { new: true }
//           )
//           .then(dbRes => {
//             req.session.currentUser = dbRes;
//             res.redirect("/dashboard");
//           })
//           .catch(err => console.log(err));
//       } else {
//         res.redirect("/form");
//       }
//     })
//     .catch(err => console.log(err));
// });
