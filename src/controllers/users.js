const User = require("../database/models/user");

// NEED TO ADD THE FLASH msg later on if possible
module.exports.renderRegister = (req, res) => {
	res.render("users/register");
};



module.exports.renderLogin = (req, res) => {
	res.render("users/login");
};

// module.exports.login = (req, res) => {
// 	const redirectUrl = req.session.returnTo || "/uploads";
// 	delete req.session.returnTo;
// 	console.log("log IN")
// 	res.redirect(redirectUrl);
// };

// ** ********************************************
module.exports.logout = (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
	});
	res.redirect("/uploads");
};
