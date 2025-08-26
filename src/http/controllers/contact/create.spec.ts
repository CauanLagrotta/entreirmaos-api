import { PrismaClient } from "generated/prisma-test";

describe("Create contact", () => {
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

  it("should be able to POST a contact message", async () => {
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

    expect(contact).toBeTruthy();
    expect(contact.name).toBe(name);
  });
});
