/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).send({
      success: true,
      message: "All students fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(200).send({
      success: true,
      message: "Something went wrong!",
      error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    if (result) {
      res.status(200).send({
        success: true,
        message: "Student fetched successfully!",
        data: result,
      });
    } else {
      res.status(404).send({
        success: false,
        message: `No such student found with ID: ${studentId}!`,
        data: {},
      });
    }
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).send({
      success: true,
      message: "Student deleted successfuly!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || "Something went wrong!",
      error,
    });
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
