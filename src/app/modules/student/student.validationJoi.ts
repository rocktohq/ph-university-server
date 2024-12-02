import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      "string.pattern.base": "First name must be capitalized!",
      "string.max": "First name can't be longer than 20 chars!",
      "any.required": "First name is required!",
    }),
  lastName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      "string.pattern.base": "Last name must be capitalized!",
      "string.max": "Last name can't be longer than 20 chars!",
      "any.required": "Last name is required!",
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    "any.required": "Father's name is required!",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    "any.required": "Father's occupation is required!",
  }),
  fatherContactNo: Joi.string().trim().required().length(11).messages({
    "string.length": "Contact number must be 11 characters!",
    "any.required": "Father's contact number is required!",
  }),
  motherName: Joi.string().trim().required().messages({
    "any.required": "Mother's name is required!",
  }),
  motherContactNo: Joi.string().trim().required().length(11).messages({
    "string.length": "Contact number must be 11 characters!",
    "any.required": "Mother's contact number is required!",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Local guardian's name is required!",
  }),
  occupation: Joi.string().trim().required().messages({
    "any.required": "Local guardian's occupation is required!",
  }),
  concatNo: Joi.string().trim().required().length(11).messages({
    "string.length": "Contact number must be 11 characters!",
    "any.required": "Local guardian's contact number is required!",
  }),
  address: Joi.string().trim().required().messages({
    "any.required": "Local guardian's address is required!",
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    "any.required": "Student ID is required!",
  }),
  name: userNameValidationSchema.required().messages({
    "any.required": "Name is required!",
  }),
  password: Joi.string().required().messages({
    "any.required": "Student ID is required!",
  }),
  age: Joi.number().required(),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "{#value} is not a valid gender!",
    "any.required": "Gender is required!",
  }),
  dob: Joi.string().required().messages({
    "any.required": "Date of birth is required!",
  }),
  email: Joi.string().email().trim().required().messages({
    "any.required": "Email address is required!",
  }),
  contactNo: Joi.string().trim().required().length(11).messages({
    "string.length": "Contact number must be 11 characters!",
    "any.required": "Contact number is required!",
  }),
  emergencyContactNo: Joi.string().trim().length(11).optional().messages({
    "string.length": "Contact number must be 11 characters!",
  }),
  bloodType: Joi.string()
    .valid(
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
    )
    .required()
    .messages({
      "any.only": "{#value} is not a valid blood type!",
      "any.required": "Blood type is required!",
    }),
  presentAddress: Joi.string().trim().required().messages({
    "any.required": "Present address is required!",
  }),
  permanentAddress: Joi.string().trim().required().messages({
    "any.required": "Permanent address is required!",
  }),
  guardian: guardianValidationSchema.required().messages({
    "any.required": "Guardian information is required!",
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "any.required": "Local guardian information is required!",
  }),
  profileImg: Joi.string().trim().optional(),
  isActive: Joi.string().valid("active", "disabled").default("active"),
  isDeleted: Joi.boolean().default(false),
});

export default studentValidationSchema;
