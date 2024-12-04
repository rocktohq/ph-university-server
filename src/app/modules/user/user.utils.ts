/* eslint-disable no-undefined */
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// Find last student
const findLastStudent = async () => {
  const lastStudent = await User.findOne({ role: "student" }, { _id: 0, id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent ? lastStudent.id.substring(6) : undefined;
};

// Student ID generation
export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentId = (await findLastStudent()) || (0).toString();
  let increment = (Number(currentId) + 1).toString().padStart(4, "0");

  increment = `${payload.year}${payload.code}${increment}`;

  return increment;
};
