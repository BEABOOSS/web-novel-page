const BaseJoi = require("joi");
const sanitizeHTML = require("sanitize-html");

const extension = (joi) => ({
	type: "string",
	base: joi.string(),
	message: {
		"string.escapeHTML": "{{#label} must not include HTML!",
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				// escape symbols only(e.g. &, <)
				const filtered = sanitizeHTML(value, {
					allowedTags: [],
					allowedAttributes: {},
				});
				// show error if html was present/removed
				if (clean !== filtered) return helpers.error("string.escapeHTML");
			},
		},
	},
});
const Joi = BaseJoi.extend(extension);

module.exports.uploadSchema = Joi.Object({
	book: Joi.object({
		title: Joi.string().required().escapeHTML(),
		// coverPicture: Joi.string().required(),
		genres: Joi.string().required().escapeHTML(),
		description: Joi.string().required().escapeHTML(),
		chapters: Joi.array().items(
			Joi.object({
				name: Joi.string().escapeHTML(),
				number: Joi.string().required().escapeHTML(),
			})
		),
	}).required(),
	deleteImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
	review: Joi.object({
		rating: Joi.number().required().min().max(5),
		body: Joi.string().required().escapeHTML(),
	}).required(),
});
