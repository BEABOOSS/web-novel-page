const User = require("../models/user");

// NEED TO ADD THE FLASH msg later on if possible
module.exports.renderRegister = (req, res) => {
    res.render("users/register");
}

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
		res.redirect("register");
	}
};

module.exports.renderLogin = (req, res) => {
	res.render("user/login");
};

module.exports.login = (req, res) => {
	const redirectUrl = req.session.returnTo || "/uploads";
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.redirect("/uploads")
};