import { env } from "src/env";
import request from "supertest";
import express from "express";
import { router } from "src/http/routes/routes";

const app = express();
app.use(express.json());
app.use(router);

describe("Login with fixed password", () => {
  it("should be able to sign in", async () => {
    const password = env.ADMIN_PASSWORD;

    const res = await request(app)
      .post("/api/admin/contact/signin")
      .send({ password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not be able to sign in", async () => {
    const password = "incorrect-password";

    const res = await request(app)
      .post("/api/admin/contact/signin")
      .send({ password });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
