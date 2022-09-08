const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const uploads = require("../controllers/uploads");
const multer = require("multer");
const { storage } = require("../cloudinary");
const { array } = require("joi");
const upload = multer({ storage });

const Upload = require("../models/upload");
const { isLoggedIn } = require("../middleware");

router.route("/")
    .get(catchAsync(uploads.allBook))
    .post(isLoggedIn, upload.array("coverPicture"), catchAsync(uploads.createBook));

//-------- IMPORTANT--------
// must put the new route before the show page or else it thinks that new is an ID
router.get("/new", isLoggedIn, uploads.renderNewForm);


// I'm not sure what to do about this
// --- 
// router.post("/books/show", catchAsync(uploads.navbarSearch));
// router.post("/books/show", uploads.navbarSearch);

router.route("/:id")
    .get(catchAsync(uploads.pageOfBook))
    .put(isLoggedIn, upload.array("coverPicture"), catchAsync(uploads.updateBook))
    .delete(isLoggedIn, catchAsync(uploads.deleteBook));

router.get("/:id/edit", isLoggedIn, catchAsync(uploads.renderEditForm));

router.get("/:id/chapterss-:number", catchAsync(uploads.chapterOfBook));

module.exports = router;
