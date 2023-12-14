
require('dotenv').config();

// connecting to mongodb;
let mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

let dbConnection = mongoose.connection;

dbConnection.on("error", () => {
    console.log("Error occurred while connecting to MongoDB")
});

dbConnection.once("open", () => {
    console.log("Connected to MongoDB");
});

// cron job for deleting messages older than a month;
 require("./utils/bgJobForMessages")

// express setup

let express = require("express");
let expressApp = express();
let bodyParser = require("body-parser");
let cors = require("cors");
let path = require("path")

expressApp.use(express.static(path.join(__dirname, "/public")));


expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(cors());


//import the routes
require("./Routes/authRoutes")(expressApp);
require("./Routes/UserRoutes")(expressApp);
require("./Routes/chatRoutes")(expressApp);
require("./Routes/messageRoutes")(expressApp);

// // setup of socket.io 
// let io = require("socket.io")(5050, {
//     cors: {
//         origin: "http://localhost:5173"
//     }
// })

// let activeUsers = []

// io.on("connection", (socket) => {

//     // add new user
//     socket.on("new-user", (userId) => {

//         if (!activeUsers.find(user => user.userId == userId)) {
//             activeUsers.push({
//                 userId: userId,
//                 socketId: socket.id
//             })
//         }
//         //get active users
//         io.emit("get-users", activeUsers)
//         console.log("connected Users", activeUsers)
//     })

//     // send message to receiver
//     socket.on("send-message", (data) => {

//         let [receiverId] = data.receiver;
//         let user = activeUsers.find(user => user.userId == receiverId);
    
//         if (user) {
            
//             io.to(user.socketId).emit("receive-message", data);
//         }
//     })

//     socket.on("disconnect", () => {
//         activeUsers = activeUsers.filter(user => user.socketId !== socket.id);
//         io.emit("get-users", activeUsers);
//         io.emit("disconnet-time", { disconnectedAt: Date.now() });
//     })

// })



expressApp.listen(process.env.PORT, () => {
    console.log("server listening on port " + process.env.PORT)
})
