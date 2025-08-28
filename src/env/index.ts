import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  TEST_URL: z.string(),
  BREVO_SMTP: z.string(),
  BREVO_PORT: z.string(),
  BREVO_LOGIN: z.string(),
  BREVO_PASSWORD: z.string(),
  ADMIN_PASSWORD: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("⚠ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
