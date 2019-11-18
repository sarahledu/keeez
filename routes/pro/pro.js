const express = require("express");
const router = new express.Router();
// const albumModel = require("./../models/Album");
// const artistModel = require("./../models/Artist");
//const protectAdminRoute = require("./../middlewares/protectAdminRoute");

router.get("/pro/", (req,res)=>{
    res.render("pro/index-pro", {css: ["filter", "styles"]})
})

router.get("/pro/my-account", (req,res)=>{
    res.render("pro/dashboard")
})
module.exports = router;