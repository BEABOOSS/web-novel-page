const mongoose = require("mongoose");

const DB_URL = process.env.DB_ATLAS_URL || process.env.MONGO_URL;


// connect to mongo and sends back error if something goes wrong
mongoose
	.connect(DB_URL)
	.then(() => {
		console.log("DataBase connected!!!");
	})
	.catch((err) => {
		console.log("OHHH NOO MONGO CONNECTION ERROR!!!");
		console.log(err);
	});
