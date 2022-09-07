const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const uploads = require("../controllers/uploads");
const multer = require("multer");
const {storage} = require("../cloudinary");
const {array} = require("joi");
const upload = multer({storage});


const Upload = require("../models/upload");

router.route("/")
    .get(catchAsync(uploads.allBook))
    .post(upload.array("coverPicture"), catchAsync(uploads.createBook))

//-------- IMPORTANT--------     
// must put the new route before the show page or else it thinks that new is an ID
router.get("/new", uploads.renderNewForm)

router.route("/:id")
    .get(catchAsync(uploads.pageOfBook))
    .put(upload.array("coverPicture"), catchAsync(uploads.updateBook))
    .delete(catchAsync(uploads.deleteBook));

router.get("/:id/edit", catchAsync(uploads.renderEditForm))


router.get("/:id/chapterss-:number", catchAsync(uploads.chapterOfBook))
