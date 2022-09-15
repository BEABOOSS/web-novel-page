const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/models/user");
const { comparePassword } = require("../utils/helpers");

passport.use(
	new Strategy(
		{
			usernameField: "email",
		},
		async (email, password, done) => {
			console.log(email);
			console.log(password);

			try {
				if (!email || !password) throw new Error("MISSING CREDENTIALS");
				const userDB = await User.findOne({ email });
				if (!userDB) throw new Error("user not found");
				const isValid = comparePassword(password, userDB.password);
				if (isValid) {
					console.log("Authenticated Successfully");
					done(null, userDB);
				} else {
					console.log("Failed to Authenticate");
					return res.send(401);
				}
			} catch (err) {
				console.log(err);
				done(err, null);
			}
		}
	)
);
