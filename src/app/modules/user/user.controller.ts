import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendRespons";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentToDB(password, studentData);

  // Send response to client with status code 200 and success message and data.
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created successfully!",
    data: result,
  });
});

export const UserControllers = { createStudent };
