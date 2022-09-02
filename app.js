// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
// };
require("dotenv/config");

const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
// const mongoSanitize = require("express-mongo-sanitize");
const Upload = require("./models/upload");
const methodOverride = require("method-override");
const { uploadSchema } = require("./schemas");

// const { cloudinary } = require("./cloudinary");
const { genre } = require("./seeds/genres");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");

// connect to mongo and sends back error if something goes wrong
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("DataBase connected!!!");
	})
	.catch((err) => {
		console.log("OHHH NOO MONGO CONNECTION ERROR!!!");
		console.log(err);
	});

const app = express();

// Setting templating engine to EJS
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// SETTING UP MULTER
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploadings");
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});

const upload = multer({ storage: storage });

const validateBook = (req, res, next) => {
	const { error } = uploadSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

app.get("/", (req, res) => {
	res.render("books/home");
});

// showing the books
app.get(
	"/uploads",
	catchAsync(async (req, res) => {
		const book = await Upload.find({});
		// console.log(book);
		res.render("books/browse", { book });
	})
);

// QUICK SEARCH
app.get("/books/quickSearch", (req, res) => {
	res.render("books/quickSearch");
});

// NEW RELEASE
app.get("/books/release", (req, res) => {
	res.render("books/release");
});

// Rendering form create
app.get("/uploads/new", (req, res) => {
	res.render("books/new", { genre });
});
app.post(
	"/uploads",

	upload.single("book[coverPicture]"),
	catchAsync(async (req, res, next) => {
		const book = new Upload(req.body.book);

		await book.save();
		res.redirect(`/uploads/${book._id}`);
	})
);

// showing the book aka all chapters
app.get(
	"/uploads/:id",
	catchAsync(async (req, res) => {
		const book = await Upload.findById(req.params.id);

		res.render("books/show", { book });
	})
);

// getting a home routes

// CONNECTING TO THE DATA BASE
const port = process.env.PORT || "3000";
app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
