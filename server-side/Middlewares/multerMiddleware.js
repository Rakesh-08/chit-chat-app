let multer = require("multer");


// Set up storage for profile pics of users;  ;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

let multerProfileMiddleware = multer({ storage: storage });

module.exports = multerProfileMiddleware;