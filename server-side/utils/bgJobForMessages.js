let cron = require("node-cron");
let messagesModel= require("../Models/messageModel")


cron.schedule("0 0 * * 0", async () => {

    let curr = new Date();
    let thresholdDate = new Date(curr.getTime()-(10*24*60*60*1000))

    let res = await messagesModel.deleteMany({
        createdAt: {
            $lte: thresholdDate
        }
    })

    console.log(res)
})