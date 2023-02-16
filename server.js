const express = require("express");
require("dotenv").config();
var cors = require("cors");
var helmet = require("helmet");
var fetch = require("node-fetch");

const cacheMiddleware = require("./middleware/cacheMiddleware");

//log server starting
console.log("Starting server...");
const app = express();

//security headers
app.use(helmet());

//enable cors only for frontend URL
const corsOptions = {
  origin: "https://portfolio-ab.herokuapp.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//forward request to Github API
const API_ENDPOINT = "https://api.github.com/users/batariloa/repos?per_page=70";
const API_KEY = process.env.GITHUB_KEY;
app.use(
  "/api",
  //cache call
  cacheMiddleware,
  async (req, res, next) => {
    const response = await fetch(API_ENDPOINT, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    const json = await response.json();

    res.send(json);
    next();
  }
);

const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log("Proxy server listening on port ", port);
});
