let chatModel = require("../Models/chatModel");
let messageModel = require("../Models/messageModel");


let createMessage = async (req, res) => {
    let { senderId, receiver, msg } = req.body;
    try {
        if (!(senderId && receiver && receiver.length >0 && msg)) {
            return res.status(400).send({
                message:"You must be missing something in your request body"
            })
        }

        // create a new message;
       let message = await messageModel.create({
            senderId,receiver,msg
        })

        let queryArray = [senderId, ...receiver];
        let chatRoom = await chatModel.findOne({
            members:queryArray
        })

        if (!chatRoom) {
            let createChatRoom = await chatModel.create({
                members: [senderId, ...receiver],
                messages:[message._id]
             })
        } else {
            chatRoom.messages.push(message._id)
            await chatRoom.save();
        }

        res.status(200).send(message)
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}

let getAllMessagesForAChatRoom = async (req, res) => {
    let { chatRoomId } = req.params
    try {

        let chatRoom = await chatModel.findOne({
            _id: chatRoomId
        });

        let messages = await messageModel.find({
            _id: { $in: chatRoom.messages }
        })

        res.status(200).send(messages)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    createMessage,
    getAllMessagesForAChatRoom
}