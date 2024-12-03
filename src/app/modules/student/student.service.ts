import { Student } from "./student.model";

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
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
