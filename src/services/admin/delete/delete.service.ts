import { ContactNotFoundError } from "src/errors/contact-not-found.error";
import { prisma } from "src/lib/prisma";

export async function DeleteContactService(id: string) {
  const findContact = await prisma.contact.findFirst({
    where: { id },
  });

  if (!findContact) {
    throw new ContactNotFoundError();
  }

  const contact = await prisma.contact.delete({
    where: { id },
  });

  return contact;
}
