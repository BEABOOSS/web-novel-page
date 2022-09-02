const mongoose = require("mongoose");
const { array } = require("joi");
const Schema = mongoose.Schema;
const Review = require("./review");

const ImageSchema = new Schema({
	url: String,
	filename: String,
});

// ImageSchema.virtual("thumbnail").get(function () {
// 	return this.url.replace("/upload", "/upload/w_200");
// });

// const opts = { toJSON: { virtuals: true } };

const UploadSchema = new Schema({
	title: String,
	description: String,
	genres: String,
	uploadTime: {
		type: Date,
		default: Date.now,
	},
	coverPicture: {
		url: String,
		filename: String,
	},
	chapters: [
		{
			name: String,
			number: String,
			images: [ImageSchema],
			uploadTime: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

UploadSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await Review.deleteMany({
			_id: {
				$in: doc.reviews,
			},
		});
	}
});

module.exports = new mongoose.model("Upload", UploadSchema);
