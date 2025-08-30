import { PrismaClient } from "generated/prisma-test";
import request from "supertest";
import express from "express";
import { router } from "src/http/routes/routes";

const app = express();
app.use(express.json());
app.use(router);

describe("Update contact", () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.testContact.deleteMany({});
  });

  it("should be able to PUT a contact message", async () => {
    const name = "John doe";
    const email = "johndoe@example.com";
    const phone = "(11)99999-9999";
    const message = "A random message for test...";

    const contact = await prisma.testContact.create({
      data: {
        name,
        email,
        message,
        phone,
      },
    });

    const updatedContact = await prisma.testContact.update({
      where: { id: contact.id },
      data: { name: "Jimmy doe" },
    });

    expect(updatedContact).toBeTruthy();
    expect(updatedContact.name).toBe("Jimmy doe");
  });

  it("should not be able to PUT a contact message", async () => {
    const name = "John doe";
    const email = "johndoe@example.com";
    const phone = "(11)99999-9999";
    const message = "A random message for test...";

    await prisma.testContact.create({
      data: {
        name,
        email,
        message,
        phone,
      },
    });

    const nonExistentId = "non-existent-id";
    const updatedName = "some random name";

    const res = await request(app)
      .put(`/api/admin/contact/${nonExistentId}`)
      .send({ updatedName });

    expect(res.status).toBe(404);
  });
});
