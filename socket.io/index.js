let io = require("socket.io")( 5050,{
    cors: {
        origin:"http://localhost:5173"
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

   

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter(user => user.socketId !== socket.id);
        console.log("User disconnected ", activeUsers);
        io.emit("get-users", activeUsers)
    })

})




