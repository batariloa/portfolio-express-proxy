var cors = require("cors");
var helmet = require("helmet");
var { router } = require("./routers/gitRouter");
const express = require("express");
require("dotenv").config();
//log server starting
console.log("Starting server...");
const app = express();

//security headers
app.use(helmet());

//enable cors only for frontend URL
const corsOptions = {
  origin: [
    "http://portfolio-ab.herokuapp.com",
    "https://portfolio-ab.herokuapp.com",
    "http://www.portfolio-ab.herokuapp.com",
    "https://www.portfolio-ab.herokuapp.com",
    "http://batariloa.tech",
    "http://www.batariloa.tech",
    "https://www.batariloa.tech",
    "https://batariloa.tech",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//set API routes
app.use(router);

// Let the environment set the port, if not, use 3200
const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log("Proxy server listening on port", port);
});
