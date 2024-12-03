import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "faculty", "student"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//* Middlewares
// 1. Document Middleware: Works only on create() and save() methods
// Pre-Middleware
userSchema.pre("save", async function (next) {
  // Hash password before save()
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds));

  next();
});

// Post-Middleware
userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

export const User = model<TUser>("user", userSchema);
