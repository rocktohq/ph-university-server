import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, "Firstname can't be longer than 20 characters!")
    .refine(
      (value) =>
        value === value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      { message: "First name is not capitalized!" },
    ),
  lastName: z
    .string()
    .max(20, "Lastname can't be longer than 20 characters!")
    .refine(
      (value) =>
        value === value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      { message: "Last name is not capitalized!" },
    ),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z
    .string()
    .max(11, "Contact no can't be more than 11 characters!"),
  motherName: z.string().trim(),
  motherContactNo: z.string().max(11, "Contact no must be 11 characters!"),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim(),
  occupation: z.string().trim(),
  concatNo: z.string().max(11, "Contact no must be 11 characters!"),
  address: z.string().trim(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20, "Password must be less than 20 characters!"),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dob: z.date(),
      email: z.string().email("Invalid email address!"),
      contactNo: z.string().max(11, "Contact no must be 11 characters"),
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
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
