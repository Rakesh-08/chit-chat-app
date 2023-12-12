let chatModel = require("../Models/chatModel");

let fetchChatRooms = async (req, res) => {

    try {

        let chatRooms = await chatModel.find({
            members: req._id
        })

        res.status(200).send(chatRooms)


    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

let s = async (req, res) => {

    try {

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    fetchChatRooms
}

