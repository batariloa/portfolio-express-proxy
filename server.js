const express = require("express");
require("dotenv").config();
var cors = require("cors");

const { createProxyMiddleware } = require("http-proxy-middleware");

console.log("Starting server...");

const app = express();

const corsOptions = {
  origin: "https://portfolio-ab.herokuapp.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const API_ENDPOINT = "https://api.github.com/users/batariloa/repos?per_page=70";
const API_KEY = process.env.GITHUB_KEY;

app.use(
  "/api",
  createProxyMiddleware({
    target: API_ENDPOINT,
    changeOrigin: true,
    pathRewrite: { "^/api": "/" },
    headers: {
      "X-API-KEY": API_KEY,
    },
  })
);

app.listen(process.env.PORT, () => {
  console.log("Proxy server listening on port ", process.env.PORT);
});
