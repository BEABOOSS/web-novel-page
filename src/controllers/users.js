const User = require("../src/models/user");
const Upload = require("../src/models/upload");
// NEED TO ADD THE FLASH msg later on if possible
module.exports.renderRegister = (req, res) => {
	res.render("users/register");
};

module.exports.register = async (req, res, next) => {
	try {
		const { email } = req.body;
		const userDB = await User.findOne({ email });
		if(userDB) {
			res.status(400);
			res.send({msg: "You can't use that one"});
		} else {
			const {password} = req.body
			const newUser = new User.register({ email, password})
			req.login(newUser, (err) => {
				if (err) return next(err);
				res.redirect("/uploads")
			})
			res.send(201)
		}




		// const registeredUser = await User.register(userDB, password);
		// req.login(registeredUser, (err) => {
		// 	if (err) return next(err);
		// 	res.redirect("/uploads");
		// });
	} catch (e) {
		console.log(e);
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
