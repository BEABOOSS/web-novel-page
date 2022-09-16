const express = require("express");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../../middleware");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({mergeParams: true});
const reviews = require("../controllers/reviews");


// New Review
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview))

// Deleting 
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;