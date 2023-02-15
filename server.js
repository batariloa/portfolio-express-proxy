const express = require("express");
require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");

console.log("Starting server...");

const app = express();

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

app.listen(3200, () => {
  console.log("Proxy server listening on port 3200");
});
