const express = require("express");
const router = new express.Router();
// const albumModel = require("./../models/Album");
// const artistModel = require("./../models/Artist");
//const protectAdminRoute = require("./../middlewares/protectAdminRoute");

router.get('/',(req,res)=>{
    res.send("foo")
})

module.exports = router;