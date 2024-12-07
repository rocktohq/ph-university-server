import { z } from "zod";

const createUserNameValidationSchema = z.object({
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

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, "Firstname can't be longer than 20 characters!")
    .refine(
      (value) =>
        value === value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      { message: "First name is not capitalized!" },
    )
    .optional(),
  lastName: z
    .string()
    .max(20, "Lastname can't be longer than 20 characters!")
    .refine(
      (value) =>
        value === value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      { message: "Last name is not capitalized!" },
    )
    .optional(),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z
    .string()
    .max(11, "Contact no can't be more than 11 characters!"),
  motherName: z.string().trim(),
  motherContactNo: z.string().max(11, "Contact no must be 11 characters!"),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().trim(),
  occupation: z.string().trim(),
  concatNo: z.string().max(11, "Contact no must be 11 characters!"),
  address: z.string().trim(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().optional(),
  fatherOccupation: z.string().trim().optional(),
  fatherContactNo: z
    .string()
    .max(11, "Contact no can't be more than 11 characters!")
    .optional(),
  motherName: z.string().trim().optional(),
  motherContactNo: z
    .string()
    .max(11, "Contact no must be 11 characters!")
    .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().trim().optional(),
  occupation: z.string().trim().optional(),
  concatNo: z.string().max(11, "Contact no must be 11 characters!").optional(),
  address: z.string().trim().optional(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20, "Password must be less than 20 characters!"),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dob: z.string(),
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
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string(),
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(["male", "female", "other"]).optional(),
      dob: z.string().optional(),
      email: z.string().email("Invalid email address!").optional(),
      contactNo: z
        .string()
        .max(11, "Contact no must be 11 characters")
        .optional(),
      emergencyContactNo: z.string().optional(),
      bloodType: z
        .enum([
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
        ])
        .optional(),
      presentAddress: z.string().trim().optional(),
      permanentAddress: z.string().trim().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
