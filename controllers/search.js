const Upload = require("../models/upload");

module.exports.searchBar = async(req, res, next) => {
    const searchTerm = req.body.searchTerm;
    const book = await Upload.find({$text: {$search: searchTerm,  $diacriticSensitive: true }});
    if(book === undefined || book.length === 0) {
        return res.redirect("/uploads/")
    } else {
        res.redirect(`/uploads/${book[0].id}`);
    }
};
