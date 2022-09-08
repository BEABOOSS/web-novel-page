const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const Users = require("../controllers/users");



router.route("/register")
    .get(Users.renderRegister)
    .post(catchAsync(Users.register))

router.route("/login")
    .get(Users.renderLogin)
    .post(passport.authenticate("local", {failureFlash: true, failureRedirect:"/login"}), Users.login)


router.get("/logout", Users.logout);


module.exports = router;