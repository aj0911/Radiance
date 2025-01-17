import mongoose, { Schema, Document } from "mongoose";
import User from "../../../types/User";
import validator from "validator";
import bcrypt from "bcryptjs";

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
      validate: {
        validator: function (password: string): boolean {
          const strongPasswordRegex: RegExp =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
          return strongPasswordRegex.test(password);
        },
        message:
          "Password must be 8-30 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
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
      default: false,
    },
    is_remember: {
      type: Boolean,
      default: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<User & Document>("save", async function (next) {
  if (!this.isModified("password_hash")) {
    next();
  }
  this.password_hash = await bcrypt.hash(this.password_hash, 10);
  next();
});

export default mongoose.model<User>("User", userSchema);
