import { Request, Response } from "express";
import { CreateContactService } from "src/services/contact/create.service";
import { z } from "zod";

export async function CreateContactController(req: Request, res: Response) {
  const createContactBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    message: z.string(),
  });

  const { name, email, phone, message } = createContactBodySchema.parse(
    req.body
  );

  try {
    const contact = await CreateContactService({ name, email, phone, message });
    res.status(201).json({ message: "Contact sent!", contact });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
}
