const User = require("../database/models/user");
const { hashPassword } = require("../utils/helpers");

// NEED TO ADD THE FLASH msg later on if possible
module.exports.renderRegister = (req, res) => {
	res.render("users/register");
};

module.exports.register = async (req, res, next) => {
	const { email } = req.body;
	const userDB = await User.findOne({ email });
	if (userDB) {
		// instead of sending you I'll just flash a message on the screen
		res.status(400);
		res.send({ msg: "You can't use that one" });
	} else {
		const password = hashPassword(req.body.password);
		const newUser = await User.create({ email, password });

		res.redirect("/uploads");
		res.send(201);
	}
};

module.exports.renderLogin = (req, res) => {
	console.log("rendering");
	res.render("users/login");
};

module.exports.login = (req, res) => {
	// const redirectUrl = req.session.returnTo || "/uploads";
	delete req.session.returnTo;
	console.log("logged IN");
	// res.status(200);
	// res.message("Logged in");
	res.redirect("/uploads");
};

module.exports.logout = (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
	});
	res.redirect("/uploads");
};
