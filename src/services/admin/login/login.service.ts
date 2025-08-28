import jwt from "jsonwebtoken";
import { env } from "src/env";
import { randomUUID } from "node:crypto";
import { PasswordIsWrongError } from "src/errors/password-is-wrong-password.error";

export async function LoginService(password: string) {
  if (password === env.ADMIN_PASSWORD) {
    const token = jwt.sign({ token: randomUUID() }, env.JWT_SECRET);
    return { token };
  } else {
    throw new PasswordIsWrongError();
  }
}
