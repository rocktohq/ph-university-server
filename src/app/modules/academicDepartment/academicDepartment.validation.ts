import { z } from "zod";

const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Invalid type error!",
    }),
    academicFaculty: z.string(),
  }),
});

const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
};
