const User = require("../database/models/user");
const { hashPassword } = require("../utils/helpers");

module.exports.login = (req, res) => {
	console.log("logged IN");
	res.send(200);
};

module.exports.register = async (req, res, next) => {
	try {
		const { email } = req.body;
		const userDB = await User.findOne({ email });
		if (userDB) {
			// instead of sending you I'll just flash a message on the screen
			res.status(400);
			res.send({ msg: "You can't use that one" });
		} else {
			const password = hashPassword(req.body.password);
			const newUser = await User.create({ email, password });
			res.send(201);
		}
	} catch (err) {
		console.log(err);
		res.redirect("register");
	}
};
