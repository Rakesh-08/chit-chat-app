let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        default: "User"
    },
    profilePic: {
        type: String,
        default: ""
    },
    savedContacts: [{
        id: mongoose.SchemaTypes.ObjectId,
        userImg: String,
        savedAs: String
    }]

}, {
    timestamps: true,
});

let model = mongoose.model("users", userSchema);
module.exports = model;