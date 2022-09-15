const User = require("../database/models/user");
const { hashPassword } = require("../utils/helpers");


module.exports.register = async (req, res, next) => {
	const { email } = req.body;
	try {
		const userDB = await User.findOne({ email });
		if (userDB) {
			// instead of sending you I'll just flash a message on the screen
			res.status(400);
			res.send({ msg: "You can't use that one" });
		} else {
			const password = hashPassword(req.password);
			const newUser = await User.create({ email, password });
			req.login(newUser, (err) => {
				if (err) return next(err);
				res.redirect("/uploads");
			});
			res.send(201);
		}
	} catch (err) {
		console.log(err);
		res.redirect("register");
	}
};



module.exports.login = (req, res) => {
	const { username, password } = req.body;
	if (username && password) {
		if (req.session.user) {
			res.send(req.session.user);
		} else {
			req.session.user = {
				username,
			};
			res.send(req.session);
		}
	} else res.send(401);
};
