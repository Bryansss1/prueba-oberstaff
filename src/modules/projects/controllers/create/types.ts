export type CreateProjectBody = {
  descript?: string;
  name: string;
  status?: "IN_PROGRESS" | "COMPLETED" | "PENDING";
  users?: string[];
};
