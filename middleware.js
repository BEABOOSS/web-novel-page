const ExpressError = require("./utils/ExpressError");
const Upload = require("./models/upload");
const Review = require("./models/review");
const User = require("./models/user");
const { uploadSchema } = require("./schemas");



module.exports.isLoggedIn = (req, res, next) => {

    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        return res.redirect("/login");
    }
    next();
};

// Don't forget to add isAdmin or something similar

module.exports.isAuthor = async (req, res, next) => {
    const {id} = req.params;
    const book = await Upload.findById(id);
    if(!book.author.equals(req.user.id)) {
        return res.redirect(`/uploads/${id}`)
    }
    next();
};



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
