let expressApp = require("express")();

let cors = require("cors");

expressApp.use(cors());


let io = require("socket.io")(5050, {
    cors: {
        origin:"*"
    }
})

let activeUsers=[]

io.on("connection", (socket) => {
   
       // add new user
    socket.on("new-user", (userId) => {
             
        if (!activeUsers.find(user => user.userId == userId)) {
            activeUsers.push({
                userId: userId,
                socketId:socket.id
             })
        }
    //get active users
    io.emit("get-users", activeUsers)
     console.log("connected Users",activeUsers)
    })

    // send message to receiver
    socket.on("send-message", (data) => {
       
        let [receiverId] = data.receiver;
        let user = activeUsers.find(user => user.userId == receiverId);
        console.log(activeUsers)
        if (user) {
            console.log(data,user)
            io.to(user.socketId).emit("receive-message", data);
        }
    })

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter(user => user.socketId !== socket.id);
        io.emit("get-users", activeUsers);
        
    })

})




