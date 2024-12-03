import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentToDB(password, studentData);
    res.status(200).send({
      success: true,
      message: "Student created successfully!",
      data: result,
    });
  } catch (err: any) {
    // next(err);
    res.status(400).send({
      success: false,   
      message: "Failed to create student!",
      error: err.message || "An error occurred!",
    });
  }
};
export const UserControllers = { createStudent };
