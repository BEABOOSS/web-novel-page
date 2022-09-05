const mongoose = require("mongoose");
const Chapter = require("../models/chapter");
const Upload = require("../models/upload");
const { genre } = require("./genres");
const data = require("./data.json");
const Manga = require("./export-manga-BEABOOSS");
const { bool } = require("joi");

const lorem = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, obcaecati voluptatibus.Accusantium minus beatae qui harum optio. Modi ea laborum corrupti sit reiciendis cumque hic sapiente aperiam incidunt quaerat. Repudiandae quasi quo quibusdam tenetur distinctio reprehenderit provident cupiditate, aliquam facere repellendus.
`;

mongoose.connect("mongodb://localhost:27017/web-novel-page");

// checks if there is an error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// if database opened prints :
db.once("open", () => {
	console.log("Database connected");
});

const seedDB = async () => {
	await Upload.deleteMany({});
	await Chapter.deleteMany({});
	for (let i = 0; i < 12; i++) {
		const random114 = Math.floor(Math.random() * 114);
		const genres = Math.floor(Math.random() * 109);
		const book = new Upload({
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
					images: [
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 2 ",
					images: [
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
					],
				},
				{
					name: "asdfhjklasdfjkhasdhjk 3 ",
					images: [
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
						{
							url: "https://blogger.googleusercontent.com/img/a/AVvXsEiDMuEGSKP10Dn8WXoyFCGmlaveKnl5UEgiTyoGmNpkt3qmm0QxI3xScl5yIdYlXHBnZvsqa4ARvhIANbCjImxjnPG0OnvPdzHS__av6VJzJTH2TlFAc9QirYE68GLogPk3Jg9c07wB7vm8dj1SLVet6hUSf_VthsNJ-tVf4_3Krxm7ABquH5RS2qRVNQ=s7988",
							filename: "yup",
						},
					],
				},
			],
		});

		await book.save();
		console.log(book);
	}
};

// sedDB().then(()=> {
//     mongoose.connection.close();
// })
seedDB().then(() => {
	mongoose.connection.close();
});
