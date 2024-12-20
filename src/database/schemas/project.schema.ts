import { Schema, model } from "mongoose";

const ProjectsSchema = new Schema({
  descript: { type: String, required: false },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["IN_PROGRESS", "COMPLETED", "PENDING"],
    required: true,
    default: "PENDING",
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

export const ProjectsModel = model("projects", ProjectsSchema);
