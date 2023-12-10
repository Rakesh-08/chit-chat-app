let { sendOtp,joiningNotification } = require("../utils/sendEmail");
let userModel=require("../Models/userModel")

let signupRegistration = async (req, res) => {

    let { email } = req.body;
    try {

        let otp = Math.floor(Math.random() * 90000) + 10000;
        sendOtp(email, otp);

        res.status(200).send({otp:otp,time:new Date()})
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


let login = async (req, res) => {

    let { email, mobile } = req.body;

    try {
     
        let IsUserExist = await userModel.findOne({
            email:email
        })

        if (IsUserExist) {
          return res.status(200).send(IsUserExist)
        }

        let newUser = await userModel.create({
                 mobile,email
        })

        joiningNotification();
        res.status(200).send(newUser)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    signupRegistration,
    login
}