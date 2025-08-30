import { Request, Response } from "express";
import { ContactNotFoundError } from "src/errors/contact-not-found.error";
import { UpdateContactService } from "src/services/admin/update/update.service";
import { z } from "zod";
import { ZodError } from "zod";

export async function UpdateContactController(req: Request, res: Response) {
  const createContactBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    message: z.string().max(300).optional(),
  });

  const { name, email, phone, message } = createContactBodySchema.parse(
    req.body
  );

  const { id } = req.params;

  try {
    const contact = await UpdateContactService({ id, name, email, message, phone });
    res.status(200).json({ message: "Updated successfully!", contact });
  } catch (err) {
    if (err instanceof ContactNotFoundError) {
      res.status(404).json({ error: err.message });
    }

    if (err instanceof ZodError) {
      res.status(400).json({ error: "Invalid parameters", details: err });
    }

    throw err;
  }
}
