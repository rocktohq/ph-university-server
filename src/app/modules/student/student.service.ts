import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // Built-in static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error(`User with id: ${studentData.id} already exists!`);
  }

  if (await Student.isEmailExists(studentData.email)) {
    throw new Error(
      `An user with email: "${studentData.email}" already exists!`,
    );
  }
  const result = await Student.create(studentData);

  // Instance method
  // const student = new Student(studentData);

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User already exists!");
  // }
  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find({});
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

// Delete Student
const deleteStudentFromDB = async (id: string) => {
  if ((await Student.isUserExists(id)) === null) {
    throw new Error(`User doesn't exists!`);
  }

  // if (await Student.isDeleted(id)) {
  //   throw new Error("No student found or already deleted!");
  // }

  const result = await Student.updateOne({ id }, { $set: { isDeleted: true } });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
