const mongoose = require("mongoose");
const { array } = require("joi");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;



const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    entries: [
        {
            type: Schema.Types.ObjectId,
            ref: "UserLikeSt",
        },
    ]
});


UserSchema.plugin(passportLocalMongoose);




module.exports = mongoose.Schema("User", UserSchema);