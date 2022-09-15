const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const searching = require("../controllers/search");
const { isLoggedIn } = require("../../middleware");

// router
// 	.route("/login")
// 	.get(users.renderLogin)
// 	.post(passport.authenticate("local", { failureRedirect: "/login" }), users.login);

// router.route("/register").get(users.renderRegister).post(catchAsync(users.register));

router.use((req, res, next) => {
	if (req.session.user) next();
	else res.send(401);
});

// Search in the navbar
router.post("/books/show", catchAsync(searching.searchBar));

// Do not need anymore like bookmarks are stored local storage
// router.post("/uploads/:id/users", isLoggedIn, catchAsync(users.bookmark))

router.get("/logout", users.logout);

module.exports = router;
