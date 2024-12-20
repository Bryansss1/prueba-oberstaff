import { Schema, model } from "mongoose";

const TasksSchema = new Schema({
  descript: { type: String, required: true },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["IN_PROGRESS", "COMPLETED", "PENDING"],
    required: true,
    default: "PENDING",
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "projects",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
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

export const TasksModel = model("tasks", TasksSchema);
