// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
// };
require("dotenv/config");

const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const mongoSanitize = require("express-mongo-sanitize");
const Upload = require("./models/upload");
const methodOverride = require("method-override");
const { uploadSchema } = require("./schemas");
const helmet = require("helmet");

const { cloudinary } = require("./cloudinary");
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
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "uploadings");
// 	},
// 	filename: (req, file, cb) => {
// 		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// 		cb(null, file.fieldname + "-" + uniqueSuffix);
// 	},
// });
const { storage } = require("./cloudinary");
const upload = multer({ storage });

const scriptSrcUrls = ["https://stackpath.bootstrapcdn.com/", "https://kit.fontawesome.com/", "https://cdnjs.cloudflare.com/", "https://cdn.jsdelivr.net/", "https://res.cloudinary.com/dqdaf6ffk/"];
const styleSrcUrls = [
	"https://kit-free.fontawesome.com/",
	"https://stackpath.bootstrapcdn.com/",
	"https://fonts.googleapis.com/",
	"https://use.fontawesome.com/",
	"https://cdn.jsdelivr.net/",
	"https://res.cloudinary.com/dqdaf6ffk/",
];

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: [],
				connectSrc: ["'self'", "https://res.cloudinary.com/dqdaf6ffk/"],
				scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
				styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
				workerSrc: ["'self'", "blob:"],
				objectSrc: [],
				imgSrc: [
					"'self'",
					"blob:",
					"data:",
					"https://res.cloudinary.com/dqdaf6ffk/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
					"https://images.unsplash.com/",
				],
				fontSrc: ["'self'", ..."https://res.cloudinary.com/dqdaf6ffk/"],
				mediaSrc: ["https://res.cloudinary.com/dlzez5yga/"],
				childSrc: ["blob:"],
			},
		},
		crossOriginEmbedderPolicy: false,
	})
);

const validateBook = (req, res, next) => {
	const { error } = uploadSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

// getting a home routes
app.get("/", (req, res) => {
	res.render("books/home");
});

// rendering the register form
app.get("/register", (req, res) => {
	res.render("users/register");
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

// QUICK SEARCH Do be determined  DBT
// app.get("/books/quickSearch", (req, res) => {
// 	res.render("books/quickSearch");
// });

app.post(
	"/books/show",
	catchAsync(async (req, res, next) => {
		let searchTerm = req.body.searchTerm;
		let book = await Upload.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });

		return res.redirect(`/uploads/${book[0].id}`);
	})
);

// NEW RELEASE tbh might scrap this 
app.get("/books/release", (req, res) => {
	res.render("books/release");
});

//
// Rendering form create
//
app.get("/uploads/new", (req, res) => {
	res.render("books/new", { genre });
});

//
// POSTING the new book to the db 
app.post(
	"/uploads",

	upload.array("coverPicture"),
	catchAsync(async (req, res, next) => {
		const book = new Upload(req.body.book);
		book.coverPicture = req.files.map((f) => ({ url: f.path, filename: f.filename }));
		book.chapters;
		await book.save();
		console.log(book);
		res.redirect(`/uploads/${book._id}`);
	})
);

// showing the book aka all chapters
app.get(
	"/uploads/:id",
	// upload.array("coverPicture"),
	catchAsync(async (req, res) => {
		const book = await Upload.findById(req.params.id);
		const lastIdx = book.chapterss[book.chapterss.length - 1];
		const lastValue = book.chapterss.length;
		const revOrder = book.chapterss.slice().reverse();

		res.render("books/show", { book, lastIdx, lastValue, revOrder });
	})
);

// showing the actual chapter that shows the images
app.get(
	"/uploads/:id/chapterss-:number/",
	catchAsync(async (req, res) => {
		const book = await Upload.findById(req.params.id);
		book.number = req.params.number;

		res.render("books/chapter", { book });
	})
);

// rendering Edit form
app.get(
	"/uploads/:id/edit",
	catchAsync(async (req, res) => {
		const book = await Upload.findById(req.params.id);

		res.render("books/edit", { book, genre });
	})
);
// updating book
app.put(
	"/uploads/:id",
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const book = await Upload.findById(id, { ...req.body.campground });
		const images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
		book.chapters.images.push(...images);
		await book.save();
		if (req.body.deleteImages) {
			for (let filename of req.body.deleteImages) {
				await cloudinary.uploader.destroy(filename);
			}
			await book.updateOne({ $pull: { chapters: { images: { filename: { $in: req.body.deleteImages } } } } });
		}
		res.redirect(`/uploads/${book._id}`);
	})
);

app.delete(
	"/uploads/:id",
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Upload.findByIdAndDelete(id);
		res.redirect("books/browse");
	})
);

// CONNECTING TO THE DATA BASE
const port = process.env.PORT || "3000";
app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
