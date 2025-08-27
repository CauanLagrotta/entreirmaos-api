import { PrismaClient } from "generated/prisma-test";

describe("Delete contact", () => {
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

  it("should be able to delete an existent contact", async () => {
    const name = "John doe";
    const email = "johndoe@example.com";
    const phone = "(11)99999-9999";
    const message = "A random message for test...";

    const createContact = await prisma.testContact.create({
      data: {
        name,
        email,
        message,
        phone,
      },
    });

    const contact = await prisma.testContact.delete({
      where: { id: createContact.id },
    });

    expect(contact).toBeTruthy();
  });

  it("should not be able to delete an existent contact with the correct message", async () => {
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

    await prisma.testContact.delete({
      where: { id: "non-existent-id" },
    }).catch((error) => {
      expect(error).toBeTruthy();
      expect(error).toBeInstanceOf(Error);
    });
  });
});
