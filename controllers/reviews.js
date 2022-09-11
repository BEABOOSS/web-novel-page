const Review = require("../models/review");
const Upload = require("../models/upload");

module.exports.createReview = async (req, res, next) => {
	const { id } = req.params;
	const book = await Upload.findById(id);
	const review = new Review(req.body);
	review.author = req.user._id;
	book.reviews.push(review);
	
	// console.log(req)
	await review.save();
	await book.save();
	res.redirect(`/uploads/${id}`);
};

module.exports.deleteReview = async (req, res) => {
	const { id, reviewId } = req.params;
	await Upload.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
	await Review.findByIdAndDelete(reviewId);
	res.redirect(`/uploads/${id}`);
};
