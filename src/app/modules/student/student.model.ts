import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from "./student.interface";

//* Schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required!"],
    trim: true,
    maxlength: [20, "Firstname can't be longer than 20 chars!"],
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        return firstNameStr === value; // CASE: firstName = Saidul
      },
      message: "{VALUE} is not capitalized!", // CASE: firstName = saiDul
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required!"],
    trim: true,
    maxlength: [20, "Lastname can't be longer than 20 chars!"],
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        return firstNameStr === value; // CASE: lastName = Saidul
      },
      message: "{VALUE} is not capitalized!", // CASE lastNamne = saIdul
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required!"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required!"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required!"],
    maxlength: [11, "Conact no can't be more than 11 chars!"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required!"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required!"],
    maxlength: [11, "Conact no must be 11 chars!"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required!"],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required!"],
    trim: true,
  },
  concatNo: {
    type: String,
    required: [true, "Local guardian's contact number is required!"],
    maxlength: [11, "Conact no must be 11 chars!"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required!"],
    trim: true,
  },
});

// Student Schema
const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, "Student ID is required!"],
    unique: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required!"],
    unique: true,
    ref: "User",
  },
  name: {
    type: userNameSchema,
    required: [true, "Name is required!"],
    trim: true,
  },

  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not a valid gender!",
    },
    required: [true, "Gender is required!"],
  },
  dob: {
    type: String,
    required: [true, "Date of birth is required!"],
  },
  email: {
    type: String,
    required: [true, "Email address is required!"],
    unique: true,
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required!"],
    maxlength: [11, "Conatct no must be 11 chars"],
  },
  emergencyContactNo: {
    type: String,
    maxlength: [11, "Conatct no must be 11 chars"],
    trim: true,
  },
  bloodType: {
    type: String,
    enum: {
      values: [
        "A",
        "A+",
        "A-",
        "AB",
        "AB+",
        "AB-",
        "B",
        "B+",
        "B-",
        "O",
        "O+",
        "O-",
      ],
      message: "{VALUE} is not a valid blood type!",
    },
    required: [true, "Blood type is required!"],
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required!"],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required!"],
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is required!"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian information is required!"],
  },
  profileImg: { type: String, trim: true },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    required: [true, "Admission semester is required!"],
    ref: "AdmissionSemester",
  },
  isDeleted: { type: Boolean, default: false },
});

//* Middlewares

// Query Mddleware:
studentSchema.pre("find", function (next) {
  // Exclude deleted docs
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//
//* Instance Methods
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = Student.findOne({ id });
//   return existingUser;
// };

//* Static Methods
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
studentSchema.statics.isEmailExists = async function (email: string) {
  return await Student.findOne({ email });
};

studentSchema.statics.isDeleted = async function (id: string) {
  return await Student.findOne({
    $and: [{ id }, { isDeleted: { $eq: true } }],
  });
};

//* Model
export const Student = model<TStudent, StudentModel>("Student", studentSchema);
