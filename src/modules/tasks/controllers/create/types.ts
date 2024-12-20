export type CreateTaskBody = {
  descript: string;
  name: string;
  status?: "IN_PROGRESS" | "COMPLETED" | "PENDING";
  project_id: string;
  user_id?: string;
};
