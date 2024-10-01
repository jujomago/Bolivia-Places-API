import z from "zod";

const userSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Name is required" }) // Para requerir el campo
    .min(1, { message: "Name must be a string" }), // Mensaje personalizado para tipo
  full_name: z
    .string()
    .nonempty({ message: "Full Name is required" })
    .min(1, { message: "Full Name must be a string" }),
  email: z.string().email({ message: "Email must be a valid email address" }), // Mensaje de validación de email
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
  role: z.number().optional().default(1),
  avatar: z
    .string()
    .url({
      message: "Avatar must be a valid URL",
    })
    .optional(),
  phone: z.string().optional(),
  social_accounts: z
    .array(
      z.string().url({ message: "Each social account must be a valid URL" })
    )
    .optional(),
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}
