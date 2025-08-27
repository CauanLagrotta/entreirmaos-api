import { Request, Response } from "express";
import { ContactNotFoundError } from "src/errors/contact-not-found.error";
import { DeleteContactService } from "src/services/admin/delete/delete.service";
import { z } from "zod";

export async function DeleteContactController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleteContact = await DeleteContactService(id);

    res.status(200).json({ message: "Contact deleted!", deleteContact });
  } catch (err) {
    if (err instanceof ContactNotFoundError) {
      res.status(404).json({ message: err.message });
    }

    throw err;
  }
}
