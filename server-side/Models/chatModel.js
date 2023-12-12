let mongoose = require('mongoose');

let chatRoomSchema = new mongoose.Schema({

    members: {
        type: Array,
        required: true,
    },
    messages:[]
}, {
    timestamps:true
});

let model = mongoose.model("chatRoom", chatRoomSchema);
module.exports = model;