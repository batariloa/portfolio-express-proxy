const fetch = require("node-fetch");

//forward request to Github API
const API_ENDPOINT = "https://api.github.com/users/batariloa/repos?per_page=50";
const API_KEY = process.env.GITHUB_KEY;

const getData = async (req, res, next) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    const json = await response.json();
    res.send(json);
  } catch (err) {
    next(err);
  }
};

module.exports = { getData };
