const express = require("express");
const router = new express.Router();

const isLoggedIn = require("./../../middlewares/isLoggedIn");

router.get("/pro/search", isLoggedIn.protectPro, (req,res)=>{
    res.render("pro/recherche",{css: ["filter", "styles","pro"], js: ["script","filter"]})
})


module.exports = router;