import { z } from "zod";

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .max(20, { message: "Password must be less than 20 characters" }),
  needsPasswordChange: z.boolean().default(true).optional(),
  role: z.enum(["admin", "faculty", "student"]).default("student"),
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean().default(false).optional(),
});

export const UserValidation = {
  userValidationSchema,
};
