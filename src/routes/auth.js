const { Router } = require("express");
const router = Router();
const passport = require("passport");
const auth = require("../controllers/auth");
// const User = require("../database/models/user");
// const helpers = require("../utils/helpers");

router.route("/login")
    .get(auth.renderLogin)
    .post(passport.authenticate("local"), auth.login);

router.route("/register")
    .get(auth.renderRegister)
    .post(auth.register);

router.get("/logout", auth.logout);

module.exports = router;
