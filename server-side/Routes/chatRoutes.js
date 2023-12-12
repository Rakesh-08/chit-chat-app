let verifyToken = require("../Middlewares/authMiddleware");
let { fetchChatRooms } = require("../controllers/chatController");

module.exports = (app) => {
    
    app.get("/chat-app/fetch/chatRooms",verifyToken,fetchChatRooms)
}