const mongoose = require("mongoose");
const Upload = require("../models/upload");
const Review = require("../models/review");
const { genre } = require("./genres");
const Manga = require("./export-manga-BEABOOSS");
const { bool } = require("joi");
require("dotenv/config");

const lorem = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, obcaecati voluptatibus.Accusantium minus beatae qui harum optio. Modi ea laborum corrupti sit reiciendis cumque hic sapiente aperiam incidunt quaerat. Repudiandae quasi quo quibusdam tenetur distinctio reprehenderit provident cupiditate, aliquam facere repellendus.
`;

mongoose.connect(process.env.DB_ATLAS_URL);

// checks if there is an error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// if database opened prints :
db.once("open", () => {
	console.log("Database connected");
});

const seedDB = async () => {
	await Upload.deleteMany({});
	await Review.deleteMany({});
	for (let i = 0; i < 12; i++) {
		const random114 = Math.floor(Math.random() * 114);
		const genres = Math.floor(Math.random() * 109);
		const book = new Upload({
			author: "631fb9bd74b1b4f6c6c7a424",
			title: `${Manga[random114].name}`,
			status: `${Manga[random114].status}`,
			description: lorem,
			genres: `${genre[genres]}`,
			coverPicture: [
				{
					url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662253346/chapter1/iwmruu6pwojbqgh3e5ve.jpg",
					filename: "chapter1/iwmruu6pwojbqgh3e5ve",
				},
			],
			chapterss: [
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 0,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090496/chapter1/03_ntt0zg.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090496/chapter1/04_velcif.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090496/chapter1/05_e5n9p6.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090496/chapter1/06_i7ahkk.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 2 ",
					number: 1,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090496/chapter1/07_dvtlb3.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090496/chapter1/08_pzaryw.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090496/chapter1/09_of3q25.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090496/chapter1/10_i0tljx.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090496/chapter1/11_qtvd3z.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090496/chapter1/12_y451mw.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/13_bovxnq.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 3 ",
					number: 2,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/14_tbc4xy.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/15_zt5ryg.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/16_o6tqzk.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/18_jmrzo9.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/19_w8fhb8.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/18_jmrzo9.jpg",
							filename: "yup",
						},
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/19_w8fhb8.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 3,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 4,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 5,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 6,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 7,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 8,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 9,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 10,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 11,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 12,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 13,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 14,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 15,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 16,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 1 ",
					number: 17,
					images: [
						{
							url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1662090497/chapter1/02_1_paw5qh.jpg",
							filename: "yup",
						},
					],
				},

			],
		});

		await book.save();
		// console.log(book);
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
