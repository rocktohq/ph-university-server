import { AcademicSemesterNameCodeMapper } from "./academicSemester.constant";
import {
  TAcademicSemester,
  TPartialAcademicSemester,
} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //* Academic Semester name and code checker
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid academic semester name and code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesters = async () => {
  const result = await AcademicSemester.find({});
  return result;
};

const getSingleAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemester = async (
  id: string,
  payload: TPartialAcademicSemester,
) => {
  //* Academic Semester name and code checker
  if (
    (payload.name &&
      AcademicSemesterNameCodeMapper[payload.name] !==
        AcademicSemesterNameCodeMapper.code) ||
    (payload.code &&
      AcademicSemesterNameCodeMapper[payload.code] !==
        AcademicSemesterNameCodeMapper.name) ||
    (payload.name &&
      payload.code &&
      AcademicSemesterNameCodeMapper[payload.name] !== payload.code)
  ) {
    throw new Error("Invalid academic semester name and code");
  }

  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
