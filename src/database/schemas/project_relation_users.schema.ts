import { Schema, model } from "mongoose";

const ProjectsRelationUsersSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "projects",
  },
});

export const ProjectsRelationUsersModel = model(
  "projects_relation_users",
  ProjectsRelationUsersSchema
);
