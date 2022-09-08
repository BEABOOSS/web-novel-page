const Upload = require("../models/upload");
const { cloudinary } = require("../cloudinary");
const { genre } = require("../seeds/genres");

module.exports.renderNewForm = (req, res) => {
	res.render("books/new");
};

module.exports.createBook = async (req, res, next) => {
	const book = new Upload(req.body.book);
	book.coverPicture = req.files.map((f) => ({ url: f.path, filename: f.filename }));
	// book.chapters;
	await book.save();
	// console.log(book);
	res.redirect(`/uploads/${book._id}`);
};

module.exports.navbarSearch = async (req, res, next) => {
	let searchTerm = req.body.searchTerm;
	let book = await Upload.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
	
	
	console.log(req.body);
	res.redirect(`/uploads/${book[0].id}`);
};

module.exports.allBook = async (req, res) => {
	const book = await Upload.find({});
	res.render("books/browse", { book });
};

module.exports.pageOfBook = async (req, res) => {
	const book = await Upload.findById(req.params.id);
	const lastIdx = book.chapterss[book.chapterss.length - 1];
	const revOrder = book.chapterss.slice().reverse();
	const lastValue = book.chapterss.length;

	res.render("books/show", { book, lastIdx, revOrder, lastValue });
};

module.exports.chapterOfBook = async (req, res) => {
	const book = await Upload.findById(req.params.id);
	book.number = req.params.number;

	res.render("books/chapter", { book });
};

module.exports.renderEditForm = async (req, res) => {
	const book = await Upload.findById(req.params.id);

	res.render("books/edit", { book, genre });
};


// NOT FINISH JUST ADDED WHAT I THINK NEED TO BE DONE BUT IT'S NOT CONNECTED
module.exports.updateBook = async (req, res) => {
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
};


// NOT FINISH JUST ADDED WHAT I THINK NEED TO BE DONE BUT IT'S NOT CONNECTED
module.exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    await Upload.findByIdAndDelete(id);
    res.redirect("books/browse");
};

