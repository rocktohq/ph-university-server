import { z } from "zod";

const createAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const AcademicFacultyValidations = {
  createAcademicFacultyValidation,
};
