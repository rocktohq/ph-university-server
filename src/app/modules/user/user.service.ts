import { User } from "./user.model";
import config from "../../config";
import { TUser } from "./user.interface";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";

const createStudentToDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";

  // Find academic semester information
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (admissionSemester === null) {
    throw new Error("Academic Semester not found!");
  }

  // Check if email exists
  const isEmailExists = await Student.isEmailExists(payload.email);
  if (isEmailExists) {
    throw new Error("Email already exists!");
  }

  userData.id = await generateStudentId(admissionSemester);

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentToDB,
};
