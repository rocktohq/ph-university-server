import { z } from "zod";

const userNameSchema = z.object({
  firstName: z
    .string()
    .max(20, "Firstname can't be longer than 20 chars!")
    .refine(
      (value) =>
        value === value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      { message: "First name is not capitalized!" },
    ),
  lastName: z
    .string()
    .max(20, "Lastname can't be longer than 20 chars!")
    .refine(
      (value) =>
        value === value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      { message: "Last name is not capitalized!" },
    ),
});

const guardianSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z
    .string()
    .max(11, "Contact no can't be more than 11 chars!"),
  motherName: z.string().trim(),
  motherContactNo: z.string().max(11, "Contact no must be 11 chars!"),
});

const localGuardianSchema = z.object({
  name: z.string().trim(),
  occupation: z.string().trim(),
  concatNo: z.string().max(11, "Contact no must be 11 chars!"),
  address: z.string().trim(),
});

const studentValidationZodSchema = z.object({
  id: z.string().trim(),
  name: userNameSchema,
  gender: z.enum(["male", "female", "other"]),
  dob: z.string(),
  email: z.string().email("Invalid email address!"),
  contactNo: z.string().max(11, "Contact no must be 11 chars"),
  emergencyContactNo: z.string(),
  bloodType: z.enum([
    "A",
    "A+",
    "A-",
    "AB",
    "AB+",
    "AB-",
    "B",
    "B+",
    "B-",
    "O",
    "O+",
    "O-",
  ]),
  presentAddress: z.string().trim(),
  permanentAddress: z.string().trim(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string(),
  isDeleted: z.boolean().default(false),
});

export default studentValidationZodSchema;
