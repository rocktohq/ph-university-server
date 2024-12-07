import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Student } from "./student.model";
import mongoose from "mongoose";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, "No students found!");
  }
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const isStudensExists = await Student.isStudentExists(id);
  if (!isStudensExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student does not exist!");
  }

  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

//Update student
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const isStudensExists = await Student.isStudentExists(id);
  if (!isStudensExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exists!");
  }

  const { name, guardian, localGuardian, ...remaining } = payload;
  const modifiedUpdatedData: Record<string, unknown> = { ...remaining };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Delete Student
const deleteStudentFromDB = async (id: string) => {
  if ((await Student.isStudentExists(id)) === null) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exists!");
  }

  // if (await Student.isDeleted(id)) {
  //   throw new Error("No student found or already deleted!");
  // }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student!");
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user!");
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      err?.message || "Failed to delete student!",
    );
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
