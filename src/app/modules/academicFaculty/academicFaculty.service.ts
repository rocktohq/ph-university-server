import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

//* Create new "Academic Faculty"
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  //* Add to the database
  const result = await AcademicFaculty.create(payload);
  return result;
};

//* Get all "Academic Faculties"
const getAllAcademicFaculties = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

//* Geta single "Academic Faculty"
const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

//* Update a "Academic Faculty"
const updateAcademicFaculty = async (id: string, payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

//* Delete a "Academic Faculty"
const deleteAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
