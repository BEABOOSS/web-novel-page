const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	url: String,
	filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
	return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const ChapterSchema = new Schema(
	{
		chapter: {
			name: String,
			number: String,
			images: [ImageSchema],
			uploadTime: {
				type: Date,
				default: Date.now,
			},
		},
	},
	opts
);

module.exports = new mongoose.model("Chapter", ChapterSchema);
