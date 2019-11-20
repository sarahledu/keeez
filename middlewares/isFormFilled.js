function isFormFilled(req, res, next) {
  //Check status & return form if status false
  if (
    req.session.currentUser.status &&
    req.session.currentUser.type === "investor"
  ) {
    res.redirect("/form");
    return;
  }
  next();
}
module.exports = isFormFilled;
