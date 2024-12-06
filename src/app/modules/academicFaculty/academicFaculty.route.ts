import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicFacultyValidations } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const router = Router();

router.post(
  "/create-academic-faculty",
  validateRequest(AcademicFacultyValidations.createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.patch(
  "/:academicFacultyId",
  AcademicFacultyControllers.updateAcademicFaculty,
);
router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);
router.get(
  "/:academicFacultyId",
  AcademicFacultyControllers.getSingleAcademicFaculty,
);
router.delete(
  "/:academicFacultyId",
  AcademicFacultyControllers.deleteAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
