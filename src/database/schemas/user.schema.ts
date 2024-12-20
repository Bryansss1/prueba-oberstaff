import { Schema, model } from "mongoose";

const UsersSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  is_forgot_password: {
    type: Boolean,
    required: false,
    default: false,
  },
  phone_number: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
  deleted_at: {
    type: Date,
    required: false,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

export const UsersModel = model("users", UsersSchema);
