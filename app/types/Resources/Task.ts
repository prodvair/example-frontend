export interface TaskResource {
  _id: string;
  title: string;
  content: string;
  color?: "green" | "red" | "purple" | "yellow" | "blue" | "orange",
  updated_at: string;
  created_at: string;
}
