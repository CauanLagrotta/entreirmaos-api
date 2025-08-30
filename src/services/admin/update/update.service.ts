import { ContactNotFoundError } from "src/errors/contact-not-found.error";
import { prisma } from "src/lib/prisma";
import { ContactProps } from "types/types";

interface ContactUpdateProps {
  id: string;
  name?: string;
  email?: string;
  message?: string;
  phone?: string;
}

export async function UpdateContactService({
  id,
  name,
  email,
  message,
  phone,
}: ContactUpdateProps) {
  const findContact = await prisma.contact.findFirst({
    where: { id },
  });

  if (!findContact) {
    throw new ContactNotFoundError();
  }

  const contact = await prisma.contact.update({
    where: { id },
    data: {
      name: name,
      email: email,
      message: message,
      phone: phone,
    },
  });

  return { contact };
}
