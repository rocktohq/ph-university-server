import { Types } from "mongoose";

export type TAcademicDepartment = {
  name: string;
  academicFaculty: Types.ObjectId;
};

export type TPartialAcademicDepartment = Partial<TAcademicDepartment>;
