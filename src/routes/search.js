const express = require("express");
const catchAsync = require("../utils/catchAsync");
const searching = require("../controllers/search");
const router = express.Router();




router.post("/books/show", catchAsync(searching.searchBar));



module.exports = router;