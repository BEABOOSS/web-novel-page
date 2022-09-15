const Review = require("../database/models/review");
const Upload = require("../database/models/upload");

module.exports.createReview = async (req, res, next) => {
	const { id } = req.params;
	const bookDB = await Upload.findById(id);
	const review = new Review(req.body);
	review.author = req.user._id;
	bookDB.reviews.push(review);

	await review.save();
	await bookDB.save();
	res.redirect(`/uploads/${id}`);
};

module.exports.deleteReview = async (req, res) => {
	const { id, reviewId } = req.params;
	await Upload.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
	await Review.findByIdAndDelete(reviewId);
	res.redirect(`/uploads/${id}`);
};
