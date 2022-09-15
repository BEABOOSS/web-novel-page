const User = require("../models/user");
// NEED TO ADD THE FLASH msg later on if possible
module.exports.renderRegister = (req, res) => {
	console.log(req.login)
	res.render("users/register");
};

module.exports.register = async (req, res, next) => {
	const { email, username, password } = req.body;
	const userDB = await User.findOne({ email, username });
	if (userDB) {
		// instead of sending you I'll just flash a message on the screen
		res.status(400);
		res.send({ msg: "You can't use that one" });
	} else {
		const newUser = await User.create({ username, email, password });
		req.login(newUser, (err) => {
			if (err) return next(err);
			res.redirect("/uploads")
		})
		res.send(201);
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

// ** ********************************************
module.exports.logout = (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
	});
	res.redirect("/uploads");
};
