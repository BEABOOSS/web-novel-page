const mongoose = require("mongoose");

const DB_URL = process.env.DB_ATLAS_URL || process.env.MONGO_URL;

mongoose
	.connect(DB_URL)
	.then(() => {
		console.log("DataBase connected!!!");
	})
	.catch((err) => {
		console.log("OHHH NOO MONGO CONNECTION ERROR!!!");
		console.log(err);
	});
