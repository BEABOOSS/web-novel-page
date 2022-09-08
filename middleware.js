const ExpressError = require("./utils/ExpressError");
const Upload = require("./models/upload");
const Review = require("./models/review");
const User = require("./models/user");
const { uploadSchema } = require("./schemas");



module.exports.validateBook = (req, res, next) => {
    const {error} = uploadSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).joi(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};







/// | REVIEWS |
/// V         V


module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};
