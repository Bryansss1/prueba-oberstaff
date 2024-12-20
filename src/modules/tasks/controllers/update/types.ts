export type UpdateTaskBody = {
  descript?: string;
  name?: string;
  status?: "IN_PROGRESS" | "COMPLETED" | "PENDING";
  user_id?: string;
};
