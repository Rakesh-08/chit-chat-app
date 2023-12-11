let {addNewContact,getAllContact,updateUser,uploadProfileImage }= require("../controllers/userController")
let verifyToken = require("../Middlewares/authMiddleware");
let multerProfileMiddleware= require('../Middlewares/multerMiddleware')

module.exports = (app) => {
    app.put("/chat-app/newContact",verifyToken, addNewContact);
    app.get("/chat-app/contacts", verifyToken, getAllContact);
    app.put("/chat-app/user/update", verifyToken, updateUser);
    app.put("/chat-app/profilePicture/upload",[verifyToken,multerProfileMiddleware.single("profile")],uploadProfileImage)
}