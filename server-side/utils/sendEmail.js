let Client = require("node-rest-client").Client
let client = new Client();

let baseUrl = process.env.MONGODB_URI ? "https://notification-service-m4gi.onrender.com" : "http://localhost:8080";


let sendEmailApi = `${baseUrl}/notificationService/api/v1/sendEmail`;

module.exports.joiningNotification = () => {

    console.log("joining notification")

    let emails = "mandal8285980523@gmail.com";
    let subject = "Sign up notification ";
    let content =
     `Hey admin,
      A new user is signed up with your  ${process.env.APP} application. please have a look over the guy and try to communicate with him.


      Regards
      Rakesh_Mandal
      Software Developer`

    let data = {
        emails, subject, content
    }
    let args = {
        data: data,
        headers: { "Content-Type": "application/json" }
    }



    client.post(sendEmailApi, args, ( data) => {
        if (data) {
            console.log(data);

        } 
    })


}

module.exports.sendOtp = (emails, otp) => {

    let subject = "OTP Verification for platform signup "
    
    let content = `Dear Sir/Madam,

    Thankyou for choosing this platform , lets connect and share our thoughts with each other.

    The OTP for the platform is ${otp}.
    please try to login now- https://chit-chat-with-mandal.netlify.app/
    
    
    Regards
    Chit-Chat application
    RK@Mandal.com
    `
    let data = {
        emails, subject, content
    }
    let args = {
        data: data,
        headers: { "Content-Type": "application/json" }
    }



    client.post(sendEmailApi, args, (data) => {
        if (data) {
            console.log(data);

        } 
    })

}