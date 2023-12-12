let mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    
    senderId: {
        type: mongoose.SchemaTypes.ObjectId,
        required:true
    },
    receiver: {
        type: [mongoose.SchemaTypes.ObjectId],
        required:true
    },
    msg: {
        type: String,
        required:true
    }
}, {
    timestamps: true
});

let model = mongoose.model("Messages", messageSchema);
module.exports = model;