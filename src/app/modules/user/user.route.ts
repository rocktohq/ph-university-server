import {  Router } from "express";
import { UserControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middleware/validateRequest";

            
const router = Router();
router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;