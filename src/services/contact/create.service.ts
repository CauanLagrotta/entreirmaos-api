import { prisma } from "src/lib/prisma";
import { ContactProps } from "types/types";

export async function CreateContactService({
  name,
  email,
  message,
  phone,
}: ContactProps) {
  const contact = await prisma.contact.create({
    data: {
      name,
      email,
      phone,
      message,
    },
  });

  return { contact };
}
