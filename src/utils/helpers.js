const bcrypt = require("bcryptjs");





module.exports.hashPassword = (password) => {
	const salt = bcrypt.genSaltSync();
	return bcrypt.hashSync(password, salt);
};

module.exports.comparePassword = (raw, hash) => {
	return bcrypt.compareSync(raw, hash);
};
