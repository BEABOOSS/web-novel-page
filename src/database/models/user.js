const mongoose = require("mongoose");
const { array } = require("joi");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

// passportLocalMongoose adds the userName, hash and salt field to store the username,
// the hashed password and the salt value.
// to the schema
const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	createAt: {
		type: Date,
		required: true,
		default: new Date(),
	},
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
