const User = require("../models/user");
const Upload = require("../models/upload");
// NEED TO ADD THE FLASH msg later on if possible
module.exports.renderRegister = (req, res) => {
	res.render("users/register");
};

module.exports.register = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			res.redirect("/uploads");
		});
	} catch (e) {
		console.log(e)
		res.redirect("register");
	}
};

module.exports.renderLogin = (req, res) => {
	res.render("users/login");
};

module.exports.login = (req, res) => {
	const redirectUrl = req.session.returnTo || "/uploads";
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
	});
	res.redirect("/uploads");
};

// module.exports.bookmark = async (req, res, next) => {
// 	const {id} = req.params;
// 	const book = await Upload.findById(id);
// 	const user = req.user;
// 	user.bookmarks.push(book.id)

// 	console.log(user)
// 	await user.save()
// 	res.redirect(`/uploads/${id}`)
// };
