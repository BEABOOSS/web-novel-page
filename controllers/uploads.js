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
	const book = new Upload(req.body.book);
	book.coverPicture = req.files.map((f) => ({ url: f.path, filename: f.filename }));
	// book.chapters;
	await book.save();
	// console.log(book);
	res.redirect(`/uploads/${book._id}`);
};
 
// 
// NAV
module.exports.navbarSearch = async (req, res, next) => {
	let searchTerm = req.body.searchTerm;
	let book = await Upload.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });

	console.log(req.body);
	res.redirect(`/uploads/${book[0].id}`);
};

// 
//showing all books 
module.exports.allBook = async (req, res) => {
	const book = await Upload.find({});
	// const lastIdx = book.chapterss[book.chapterss.length - 1]
	


	// console.log()
	res.render("books/browse", { book });
};

// 
// The page of the book AKA the one with all the chapters
module.exports.pageOfBook = async (req, res) => {
	const book = await Upload.findById(req.params.id);
	const lastValue = book.chapterss.length;
	const lastIdx = book.chapterss[lastValue - 1];
	const revOrder = book.chapterss.slice().reverse();

	res.render("books/show", { book, lastIdx, revOrder, lastValue });
};

// 
// The page with all the chapters AKA the one showing the images ("story")
module.exports.chapterOfBook = async (req, res) => {
	const book = await Upload.findById(req.params.id);
	const number = req.params.number - 0;	
	const number2 = req.params.number;	
	const lastIdx = book.chapterss[number - 1];
	const nextIdx = book.chapterss[number + 1];



	res.render("books/chapter", { book, lastIdx, nextIdx, number2 });
};

//
// Rendering the edit form 
module.exports.renderEditForm = async (req, res) => {
	const book = await Upload.findById(req.params.id);
	//  console.log(book)
	console.log(req.body)
	res.render("books/edit", { book, genre });
};

// NOT FINISH JUST ADDED WHAT I THINK NEED TO BE DONE BUT IT'S NOT CONNECTED
// I'm spreading the imgs because it would be an array of array's and that won't work here 
module.exports.updateBook = async (req, res) => {
	const { id } = req.params;
	const book = await Upload.findByIdAndUpdate(id, { ...req.body.book });
	const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
	book.coverPicture.push(...imgs);
	await book.save();
	if (req.body.deleteImages) {
		for (let filename of req.body.deleteImages) {
			await cloudinary.uploader.destroy(filename);
		}
		await book.updateOne({ $pull: {images: {filename: {$in: req.body.deleteImages}}} });
	}

	res.redirect(`/uploads/${book._id}`);
};

// NOT FINISH JUST ADDED WHAT I THINK NEED TO BE DONE BUT IT'S NOT CONNECTED
module.exports.deleteBook = async (req, res) => {
	const { id } = req.params;
	await Upload.findByIdAndDelete(id);
	res.redirect("books/browse");
};
