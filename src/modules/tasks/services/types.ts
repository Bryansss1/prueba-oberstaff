export type GetAllFilterQuerys = {
  user_id?: any;
  project_id?: any;
  status?: "IN_PROGRESS" | "COMPLETED" | "PENDING";
};

export type GetTaskByNameOrDescript = {
  name?: string;
  descript?: string;
};
