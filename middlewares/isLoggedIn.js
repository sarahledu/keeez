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
  }
  next();
}
function protectInvestor(req, res, next) {
  if (!req.session.currentUser) {
    res.redirect("/signin");
    return;
  }
  next();
}

module.exports = { protectPro, protectInvestor };
