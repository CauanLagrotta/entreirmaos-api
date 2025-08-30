import { Request, Response } from "express";
import { CreateContactService } from "src/services/contact/create.service";
import { z } from "zod";
import { ZodError } from "zod";

export async function CreateContactController(req: Request, res: Response) {
  const createContactBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    message: z.string().max(300),
  });

  const { name, email, phone, message } = createContactBodySchema.parse(
    req.body
  );

  try {
    const contact = await CreateContactService({ name, email, phone, message });
    res.status(201).json({ message: "Contact sent!", contact });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: "Invalid parameters", details: err });
    }

    throw err;
  }
}
