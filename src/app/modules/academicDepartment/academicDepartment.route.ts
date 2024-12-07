import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = Router();

router.post(
  "/create-academic-department",
  validateRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidation,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);
router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);
router.get(
  "/:departmentId",
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidation,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);
router.delete(
  "/:departmentId",
  AcademicDepartmentControllers.deleteAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
