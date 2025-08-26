import { Router } from "express";
import { CreateContactController } from "../controllers/contact/create.controller";

export const router = Router();

router.post("/api/contact", CreateContactController);
