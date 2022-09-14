const Upload = require("../models/upload");
const { cloudinary } = require("../cloudinary");
const { genre } = require("../seeds/genres");

//
//Render new form
module.exports.renderNewForm = (req, res) => {
	const genres = genre;
	res.render("books/new", { genres });
};

//
// Create Book
module.exports.createBook = async (req, res, next) => {
	const bookDB = new Upload(req.body);
	bookDB.coverPicture = req.files.map((f) => ({ url: f.path, filename: f.filename }));
	await bookDB.save();
	res.redirect(`/uploads/${bookDB._id}`);
};

//
// NAV
module.exports.navbarSearch = async (req, res, next) => {
	const searchTerm = req.body.searchTerm;
	const bookDB = await Upload.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
	if (bookDB === undefined || bookDB.length === 0) {
		return res.redirect("/uploads");
	} else {
		res.redirect(`/uploads/${bookDB[0].id}`);
	}
	next();
};

//
//showing all books
// still need to add proper logic for the chapters that show up on the browse page
module.exports.allBook = async (req, res) => {
	const bookDB = await Upload.find({});
	// const lastIdx = book.chapterss[book.chapterss.length - 1]


	const timeElapsed = (x) => {
		const now = Date.now() - x;
		const hourNow = Math.floor(now / 3600000);
		const dayNow = Math.floor(now / 86400000);
		const weekNow = Math.floor(now / 604800000);
		const monthNow = Math.floor(now / 2629800000);

		return hourNow <= 24 ? `${hourNow} Hours`
				: dayNow <= 6 ? `${dayNow} Days`
				: weekNow <= 4 ? `${weekNow} Week`
				: `${monthNow} Months`;
	};
	res.render("books/browse", { bookDB, timeElapsed });
};

//
// The page of the book AKA the one with all the chapters
module.exports.pageOfBook = async (req, res) => {
	const bookDB = await Upload.findById(req.params.id)
		.populate({
			path: "reviews",
			populate: {
				path: "author",
			},
		})
		.populate("author");
	const lastValue = bookDB.chapterss.length;
	const lastIdx = bookDB.chapterss[lastValue - 1];
	const revOrder = bookDB.chapterss.slice().reverse();

	res.cookie("bookmarks", `${bookDB.title}`);
	res.render("books/show", { bookDB, lastIdx, revOrder, lastValue });
};

//
// The page with all the chapters AKA the one showing the images ("story")
module.exports.chapterOfBook = async (req, res) => {
	const bookDB = await Upload.findById(req.params.id);
	const number = req.params.number - 0;
	const number2 = req.params.number;
	const lastIdx = bookDB.chapterss[number - 1];
	const nextIdx = bookDB.chapterss[number + 1];

	res.render("books/chapter", { bookDB, lastIdx, nextIdx, number2 });
};

//
// Rendering the edit form
module.exports.renderEditForm = async (req, res) => {
	const { id } = req.params;
	const bookDB = await Upload.findById(id);
	console.log(bookDB);
	res.render("books/edit", { bookDB, genre });
};

// NOT FINISH JUST ADDED WHAT I THINK NEED TO BE DONE BUT IT'S NOT CONNECTED
// I'm spreading the imgs because it would be an array of array's and that won't work here
module.exports.updateBook = async (req, res) => {
	const { id } = req.params;
	const bookDB = await Upload.findByIdAndUpdate(id, { ...req.body.bookDB });
	const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
	book.coverPicture.push(...imgs);
	await bookDB.save();
	if (req.body.deleteImages) {
		for (let filename of req.body.deleteImages) {
			await cloudinary.uploader.destroy(filename);
		}
		await bookDB.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
	}

	res.redirect(`/uploads/${bookDB._id}`);
};

// NOT FINISH JUST ADDED WHAT I THINK NEED TO BE DONE BUT IT'S NOT CONNECTED
module.exports.deleteBook = async (req, res) => {
	const { id } = req.params;
	await Upload.findByIdAndDelete(id);
	res.redirect("books/browse");
};
