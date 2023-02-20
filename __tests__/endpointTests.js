const app = require("../server");
const cache = require("memory-cache");

const request = require("supertest");

const API_KEY = process.env.GITHUB_KEY;

describe("GET /api", () => {
  test("should return an array of public Github repos if cache is unavailable", async () => {
    const response = await request(app)
      .get("/api")
      .set("X-API-KEY", API_KEY)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should retrieve data from cache if available", async () => {
    // Add some data to cache
    cache.put(
      "repo_cache",
      JSON.stringify({ data: "cached data" }),
      1000 * 60 * 60 * 24
    );
    // Make the first request
    const response1 = await request(app).get("/api");

    // Make the second request to retrieve data from cache
    const response2 = await request(app).get("/api");

    // Check if the response contains the expected data
    expect(response2.body).toEqual({ data: "cached data" });
    // Check that nothing changed after the first request
    expect(response1.body).toEqual({ data: "cached data" });
  });
});
