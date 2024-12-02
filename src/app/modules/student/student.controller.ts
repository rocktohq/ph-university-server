import { Request, Response } from "express";
import { StudentServices } from "./student.service";
// import studentValidationSchema from "./student.validationJoi";
import studentValidationZodSchema from "./student.validationZod";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // Validate the student data
    // const { error } = studentValidationSchema.validate(studentData);
    //Validation with Zod
    const zodParsedData = studentValidationZodSchema.parse(studentData);
    // Call the service function
    // const result = await StudentServices.createStudentIntoDB(studentData);
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // if (error) {
    //   res.status(500).send({
    //     success: false,
    //     message: "Student validation failed!",
    //     error: error.details,
    //   });
    // }

    // Send the respponse
    res.status(200).send({
      success: true,
      message: "Student created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message || "Something went wrong!",
      error: err,
    });
  }
};

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
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
