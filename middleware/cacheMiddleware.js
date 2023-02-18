const cache = require("memory-cache");

const cacheMiddleware = (req, res, next) => {
  const key = "repo_cache";

  const cachedBody = cache.get(key);
  if (cachedBody) {
    console.log("Retrieving cache...");
    res.send(JSON.parse(cachedBody));
    return;
  } else {
    console.log("Caching call...");
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.put(key, body, 1000 * 60 * 60 * 24); // cache for 24h
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = { cacheMiddleware };
