
let verifyToken =require("../Middlewares/authMiddleware")
let {createMessage,getAllMessagesForAChatRoom }= require("../controllers/messageController")
module.exports = (app) => {
    
    app.post("/chat-app/chat/message", verifyToken, createMessage);
    app.get("/chat-app/chatRoom/:chatRoomId/messages",verifyToken,getAllMessagesForAChatRoom)
}