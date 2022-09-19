const express = require("express");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../../middleware");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({mergeParams: true});
const reviews = require("../controllers/reviews");


// This won't work no more like I'm not setting it 
// router.use((req, res, next) => {
//     if (req.session.user) next();
//     else res.send(401);
//   });


// New Review
router.post("/", validateReview, catchAsync(reviews.createReview))
// router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview))

// Deleting 
router.delete("/:reviewId", isReviewAuthor, catchAsync(reviews.deleteReview))
// router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;