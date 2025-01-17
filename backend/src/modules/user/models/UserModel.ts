import mongoose, { Schema, Model, Document } from "mongoose";
import User from "../../../types/User";
import validator from "validator";

// Define the user schema
const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is mandatory and should be unique."],
      validate: [validator.isEmail, "Please enter a valid Email Address"],
      unique: true,
    },
    password_hash: {
      type: String,
      required: [true, "Password is mandatory."],
    },
    profile_image: {
      type: String,
    },
    full_name: {
      type: String,
      maxLength: [30, "Name must be less than 30 characters."],
    },
    username: {
      type: String,
      unique: true,
      validate: [
        validator.isAlphanumeric,
        "Only Letters and Numbers is allowed in username.",
      ],
      default:`default${Date.now()}`
    },
    dob: {
      type: Date,
    },
    phone_number: {
      type: String,
      validate: {
        validator: (value: string) => {
          return validator.isMobilePhone(value, "any", { strictMode: true });
        },
        message: `It is not a valid phone number.`,
      },
    },
    country: {
      type: String,
    },
    occupation: {
      type: String,
    },
    is_private: {
      type: Boolean,
      default:false
    },
    is_remember: {
      type: Boolean,
      default:false
    },
    is_verified: {
      type: Boolean,
      default:false
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("User", userSchema);
