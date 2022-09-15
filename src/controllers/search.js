const Upload = require("../models/upload");

module.exports.searchBar = async(req, res, next) => {
    const searchTerm = req.body.searchTerm;
    const bookDB = await Upload.find({$text: {$search: searchTerm,  $diacriticSensitive: true }});
    if(bookDB === undefined || bookDB.length === 0) {
        return res.redirect("/uploads/")
    } else {
        res.redirect(`/uploads/${bookDB[0].id}`);
    }
};
