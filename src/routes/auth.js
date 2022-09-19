const { Router } = require("express");
const router = Router();
const passport = require("passport");
const auth = require("../controllers/auth");


router.route("/register").get(auth.renderRegister).post(auth.register);

router.route("/login").get(auth.renderLogin).post(passport.authenticate("local"), auth.login);

router.get("/logout", auth.logout);

module.exports = router;
