const { Router } = require("express");
const router = Router();
const passport = require("passport");
const auth = require("../controllers/auth");
// const User = require("../database/models/user");
// const helpers = require("../utils/helpers");

router.post("/login", passport.authenticate("local"), auth.login);

router.post("/register", auth.register);

module.exports = router;
