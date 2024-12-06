import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, "Academic faculty name is required!"],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

// Middleware
academicFacultySchema.pre("save", async function (next) {
  // Academic Faculty => Name checker
  const isExists = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isExists) {
    throw new Error("Academic Faculty already exists!");
  }

  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  "AcademicFaculties",
  academicFacultySchema,
);
