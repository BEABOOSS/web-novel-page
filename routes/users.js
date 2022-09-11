const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const searching = require("../controllers/search");
const { isLoggedIn } = require("../middleware");

// Search in the navbar
router.post("/books/show", catchAsync(searching.searchBar));

router.post("/uploads/:id/users", isLoggedIn, catchAsync(users.bookmark))

router.route("/register").get(users.renderRegister).post(catchAsync(users.register));

router
	.route("/login")
	.get(users.renderLogin)
	.post(passport.authenticate("local", { failureRedirect: "/login" }), users.login);

router.get("/logout", users.logout);

module.exports = router;
