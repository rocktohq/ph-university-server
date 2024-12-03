import { User } from "./user.model";
import config from "../../config";
import { TUser } from "./user.interface";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";

const createStudentToDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";
  userData.id = "20241000001";

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student  .create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentToDB,
};
