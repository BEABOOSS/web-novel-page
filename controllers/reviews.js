const Review = require("../models/review");
const Upload = require("../models/upload");

module.exports.createReview = async (req, res, next) => {
    const book = await Upload.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    book.reviews.push(review);
    await rewiew.save();
    await book.save();
    res.redirect(`uploads/${book.id}/`)
};

module.exports.deleteReview = async (req, res) => {
    const {id, reviewId} = req.params;
    await Upload.findByIdAndDelete(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/uploads/${id}`);
}
