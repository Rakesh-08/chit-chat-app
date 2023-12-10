
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

expressApp.listen(process.env.PORT, () => {
    console.log("server listening on port " + process.env.PORT)
})
