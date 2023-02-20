const app = require("../server");

const request = require("supertest");

const API_KEY = process.env.GITHUB_KEY;

describe("GET /api", () => {
  test("should return an array of public Github repos", async () => {
    const response = await request(app)
      .get("/api")
      .set("X-API-KEY", API_KEY)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
