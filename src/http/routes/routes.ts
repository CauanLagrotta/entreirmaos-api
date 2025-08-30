import { Router } from "express";
import { CreateContactController } from "../controllers/contact/create.controller";

import { DeleteContactController } from "../controllers/admin/delete/delete.controller";
import {
  GetContactsController,
  GetSearchContactsController,
} from "../controllers/admin/read/read.controller";

import { LoginController } from "../controllers/admin/login/login.controller";
import { UpdateContactController } from "../controllers/admin/update/update.controller";

export const router = Router();

router.post("/api/contact", CreateContactController); // http://localhost:3000/api/contact

router.post("/api/admin/contact/signin", LoginController); // http://localhost:3000/api/admin/contact/signin
router.get("/api/admin/contact", GetContactsController); // http://localhost:3000/api/admin/contact?page=1&limit=10
router.get("/api/admin/contact/search", GetSearchContactsController); // http://localhost:3000/api/admin/contact/search?search=TEST
router.put("/api/admin/contact/:id", UpdateContactController);
router.delete("/api/admin/contact/:id", DeleteContactController); // http://localhost:3000/api/contact/:id
