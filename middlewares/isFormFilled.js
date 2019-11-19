function isFormedFilled(req, res, next) {
  //Check status & return form if status false
  if (
    req.session.currentUser.status &&
    req.session.currentUser.type === "investor"
  ) {
    res.redirect("/dashboard");
    return;
  }
  next();
}
module.exports = isFormedFilled;
