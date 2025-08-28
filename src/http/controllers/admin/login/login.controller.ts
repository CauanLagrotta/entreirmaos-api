import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { LoginService } from "src/services/admin/login/login.service";
import { PasswordIsWrongError } from "src/errors/password-is-wrong-password.error";

export async function LoginController(req: Request, res: Response) {
  const loginBodySchema = z.object({
    password: z.string(),
  });

  const { password } = loginBodySchema.parse(req.body);

  try {
    const { token } = await LoginService(password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: "Invalid parameters", details: err });
    }

    if (err instanceof PasswordIsWrongError) {
      res.status(401).json({ error: err.message });
    }

    throw err;
  }
}
