import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespons";
import { AcademicSemesterServices } from "./academicSemester.service";

// Add new academic semester
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester created successfully!",
    data: result,
  });
});

// Get all academic semesters
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesters();
  if (result.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All academic semesters retrieved successfully!",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No academic semeter found!",
      data: result,
    });
  }
});

// Get single academic semester
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semersterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemester(semersterId);

  if (result !== null) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester retrieved successfully!",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Academic Semester not found!",
      data: result,
    });
  }
});

// Update academic semester
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semersterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemester(
    semersterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester updated successfully!",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
