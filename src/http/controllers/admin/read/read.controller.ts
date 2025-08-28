import { Request, Response } from "express";
import { ContactNotFoundError } from "src/errors/contact-not-found.error";
import {
  GetContactsService,
  GetSearchContactsService,
} from "src/services/admin/read/read.service";
import { z } from "zod";
import { ZodError } from "zod";

export async function GetContactsController(req: Request, res: Response) {
  const getContactsParamsSchema = z.object({
    page: z.coerce.number().positive().default(1),
    limit: z.coerce.number().positive().max(20).default(10),
  });

  let initialPage = 1;
  let itemsPerPage = 10;

  try {
    const { page = initialPage, limit = itemsPerPage } =
      getContactsParamsSchema.parse(req.params);

    const { contacts, totalItems, totalPages } = await GetContactsService(
      page,
      limit
    );

    res.status(200).json({
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
      contacts,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: "Invalid parameters", details: err });
    }

    if (err instanceof ContactNotFoundError) {
      res.status(404).json({ error: err.message });
    }

    throw err;
  }
}

export async function GetSearchContactsController(req: Request, res: Response) {
  const getSearchContactsQuerySchema = z.object({
    search: z
      .string()
      .min(1, "Search term cannot be empty")
      .max(30, "Search term is too long"),
  });

  try {
    const { search } = getSearchContactsQuerySchema.parse(req.query);
    const contact = await GetSearchContactsService(search);

    res.status(200).json({ contact });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: "Invalid parameters", details: err });
    }

    if (err instanceof ContactNotFoundError) {
      res.status(404).json({ error: err.message });
    }

    throw err;
  }
}
