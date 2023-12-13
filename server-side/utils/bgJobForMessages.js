let cron = require("node-cron");
let messagesModel= require("../Models/messageModel")


cron.schedule("0 0 1 * *", async () => {

    let curr = new Date();
    let thresholdDate = new Date(curr.getFullYear(), curr.getMonth() == "0" ? "12" : curr.getMonth()-1, curr.getDate());

    let res = await messagesModel.deleteMany({
        createdAt: {
            $lte: thresholdDate
        }
    })

    console.log(res)
})