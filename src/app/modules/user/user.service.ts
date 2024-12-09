import { User } from "./user.model";
import config from "../../config";
import { TUser } from "./user.interface";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentToDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";

  // Find academic semester information
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (admissionSemester === null) {
    throw new AppError(httpStatus.BAD_REQUEST, "Academic Semester not found!");
  }

  // Check if email exists
  const isEmailExists = await Student.isEmailExists(payload.email);
  if (isEmailExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email already exists!");
  }

  // Create new session
  const session = await mongoose.startSession();

  try {
    // Start transection
    session.startTransaction();

    userData.id = await generateStudentId(admissionSemester);

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create new user");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create new student",
      );
    }

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      err?.message || "Failed to delete student!",
    );
  }
};

export const UserServices = {
  createStudentToDB,
};
