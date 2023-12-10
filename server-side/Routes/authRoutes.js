let {signupRegistration,login }=require("../controllers/authController")


module.exports = (app) => {
    app.post("/chat-app/register", signupRegistration);
    app.post("/chat-app/login/verification",login)
}