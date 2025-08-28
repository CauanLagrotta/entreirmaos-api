import { prisma } from "src/lib/prisma";

let initialPage = 1;
let itemsPerPage = 10;

export async function GetContactsService(
  page: number = initialPage,
  limit: number = itemsPerPage
) {
  const skip = (page - 1) * limit;

  const contacts = await prisma.contact.findMany({
    skip,
    take: limit,
    orderBy: {
      created_at: "desc", // newest to oldest
    },
  });

  const totalItems = await prisma.contact.count();

  return {
    contacts,
    totalItems,
    page,
    totalPages: Math.ceil(totalItems / limit),
  };
}

export async function GetSearchContactsService(search?: string) {
  const contacts = await prisma.contact.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search.toLowerCase().trim(),
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search.toLowerCase().trim(),
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
    orderBy: { created_at: "desc" },
  });

  return { contacts };
}
