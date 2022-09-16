const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const searching = require("../controllers/search");
const { isLoggedIn } = require("../../middleware");




// Search in the navbar
router.post("/books/show", catchAsync(searching.searchBar));

// Do not need anymore like bookmarks are stored local storage
// router.post("/uploads/:id/users", isLoggedIn, catchAsync(users.bookmark))

router.get("/logout", users.logout);

module.exports = router;
