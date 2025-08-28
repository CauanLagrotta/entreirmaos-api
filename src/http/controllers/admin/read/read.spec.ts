import request from "supertest";
import express from "express";
import { PrismaClient } from "generated/prisma-test";
import { router } from "src/http/routes/routes";

const app = express();
app.use(express.json());
app.use(router);

describe("Read contacts", () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.testContact.deleteMany({});
  });

  it("should return paginated contacts", async () => {
    await prisma.testContact.createMany({
      data: [
        {
          name: "John",
          email: "john@example.com",
          phone: "123",
          message: "msg",
        },
        {
          name: "Jane",
          email: "jane@example.com",
          phone: "456",
          message: "msg2",
        },
      ],
    });

    const res = await request(app).get("/api/admin/contact?page=1&limit=2");
    expect(res.status).toBe(200);
    expect(res.body.contacts.length).toBeGreaterThanOrEqual(1);
    expect(res.body.pagination).toHaveProperty("totalItems");
    expect(res.body.pagination).toHaveProperty("totalPages");
  });

  it("should search contacts by name or email", async () => {
    await prisma.testContact.create({
      data: {
        name: "Carlos",
        email: "carlos@exemple.com",
        phone: "789",
        message: "msg3",
      },
    });

    const res = await request(app).get(
      "/api/admin/contact/search?search=carlos"
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("contact");
    expect(res.body.contact).toHaveProperty("contacts");
  });

  it("should return 400 for empty search", async () => {
    const res = await request(app).get("/api/admin/contact/search?search=");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
