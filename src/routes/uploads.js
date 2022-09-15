const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const uploads = require("../controllers/uploads");
const multer = require("multer");
const { storage } = require("../../cloudinary");
const { array } = require("joi");
const upload = multer({ storage });
const { isLoggedIn, isAuthor, validateBook } = require("../../middleware");


router.use((req, res, next) => {
	if (req.session.user) next();
	else res.send(401); 
});

router.route("/")
    .get(catchAsync(uploads.allBook))
    .post( upload.array("coverPicture"), validateBook, catchAsync(uploads.createBook));

//-------- IMPORTANT--------
// must put the new route before the show page or else it thinks that new is an ID
router.get("/new", isLoggedIn, uploads.renderNewForm);


router.route("/:id")
    .get(catchAsync(uploads.pageOfBook))
    .put(isLoggedIn, isAuthor, upload.array("coverPicture"), catchAsync(uploads.updateBook))
    .delete(isLoggedIn, isAuthor ,catchAsync(uploads.deleteBook));

router.get("/:id/edit", isLoggedIn, isAuthor,catchAsync(uploads.renderEditForm));

router.get("/:id/chapterss-:number", catchAsync(uploads.chapterOfBook));

module.exports = router;
