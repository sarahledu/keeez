// module.exports = (req, res, next) => {
//   if (!req.session.currentUser) {
//     res.redirect("/signin");
//     return;
//   }
//   next();
// };

function protectPro(req, res, next) {
  if (!req.session.currentUser) {
    res.redirect("/pro/signin");
    return;
  } else if (req.session.currentUser.type !== "pro") {
    res.redirect("/pro");
    return;
  };
  next();
}
function protectInvestor(req, res, next) {
  if (!req.session.currentUser) {
    res.redirect("/signin");
    return;
  } else if (req.session.currentUser.type !== "investor") {
    res.redirect("/");
    return;
  }
  next();
}

module.exports = { protectPro, protectInvestor };
