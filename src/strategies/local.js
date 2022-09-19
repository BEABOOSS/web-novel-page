const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/models/user");
const { comparePassword } = require("../utils/helpers");
const catchAsync = require("../utils/catchAsync");

passport.serializeUser((user, done) => {
	console.log("serializing user...");
	// console.log(user);
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	// console.log(id);
	try {
		const user = await User.findById(id);
		if (!user) throw new Error("user not found");
		// console.log("in the deserialize")
		done(null, user);
	} catch (err) {
		console.log(err);
		done(err, null);
	}
});

const verifyUser = async (email, password, done) => {
	if (!email || !password) throw new MissingCredentialsError("MISSING CREDENTIALS");

	const userDB = await User.findOne({ email });
	if (!userDB) throw new UserNotFoundError("user not found");

	const isValid = comparePassword(password, userDB.password);
	if (isValid) {
		console.log("Authenticated Successfully");
		// null = error // userDB = user obj
		done(null, userDB);
	} else {
		console.log("Invalid to Authenticate");
		return res.send(null, null);
	}
};

passport.use(
	new Strategy(
		verifyUser
	)
);

module.exports = { verifyUser };
