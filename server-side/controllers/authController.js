let { sendOtp,joiningNotification } = require("../utils/sendEmail");
let userModel = require("../Models/userModel");
let jwt = require("jsonwebtoken");
let bcrypt= require('bcryptjs')

let signupRegistration = async (req, res) => {

    let { email } = req.body;
    try {

        let otp = Math.floor(Math.random() * 90000) + 10000;
        sendOtp(email, otp);

        let hashedOtp = await bcrypt.hashSync(otp.toString(), 8);

        res.status(200).send({otp:hashedOtp,time:new Date()})
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


let login = async (req, res) => {

    let { email, mobile } = req.body;

    try {
        let user;
        let IsUserExist = await userModel.findOne({
            email:email
        })

        if (IsUserExist) {
          user=IsUserExist
        } else {
            user = await userModel.create({
                mobile, email
            });
            joiningNotification();
        }

      //create a new token
    let token = jwt.sign({ id: user._id }, "Rakesh", { expiresIn: 85554 });
         
        res.status(200).send({ ...user._doc, accessToken: token });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    signupRegistration,
    login
}