const mongoose = require("mongoose");
const { array } = require("joi");
const Schema = mongoose.Schema;
const Review = require("./review");
const Chapter = require("./chapter");

const ImageSchema = new Schema({
	url: String,
	filename: String,
});
const GenresSchema = new Schema({
	name: String,
});

ImageSchema.virtual("thumbnail").get(function () {
	return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const UploadSchema = new Schema(
	{
		title: String,
		description: String,
		genres: String,
		uploadTime: {
			type: Date,
			default: Date.now,
		},
		coverPicture: [ImageSchema],
		chapters: [
			{
				type: Schema.Types.ObjectId,
				ref: "Chapter",
			},
		],
		reviews: [
			{
				type: Schema.Types.ObjectId,
				ref: "Review",
			},
		],
	},
	opts
);

UploadSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await Review.deleteMany({
			_id: {
				$in: doc.reviews,
			},
		});
	}
});

UploadSchema.index({ title: "text", description: "text" });

module.exports = new mongoose.model("Upload", UploadSchema);
