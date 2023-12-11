let jwt= require("jsonwebtoken")
module.exports = (req, res, next) => {
    let token = req.headers["x-access-token"];


    if (!token) {
        return res.status(401).send({ message: 'please pass the token along with request' })
    }


    jwt.verify(token, "Rakesh", (err, decoder) => {
        if (err) {
            return res.status(401).send({
                message: "invalid token"
            })
        };

        let currentTime = new Date().getTime() / 1000;
        if (currentTime > decoder.exp) {
            return res.status(402).send({
                message: "Token expired"
            })
        }
        req._id = decoder.id;
    })


    next();
}