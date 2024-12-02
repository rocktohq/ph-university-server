import { Model } from "mongoose";

export interface TUserName {
  firstName: string;
  lastName: string;
}

export interface TGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherContactNo: string;
}

export interface TLocalGuardian {
  name: string;
  occupation: string;
  concatNo: string;
  address: string;
}

export interface TStudent {
  id: string;
  name: TUserName;
  password: string;
  gender: "male" | "female" | "other";
  age: number;
  email: string;
  dob: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodType:
    | "A"
    | "A+"
    | "A-"
    | "B"
    | "B+"
    | "B-"
    | "AB"
    | "AB+"
    | "AB-"
    | "O"
    | "O+"
    | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: "active" | "disabled";
  isDeleted: boolean;
}

//* Instance Method
// export interface StudentMethods {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

//* Static Methods
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
  isEmailExists(email: string): Promise<TStudent | null>;
  isDeleted(id: string): Promise<TStudent | null>;
}
