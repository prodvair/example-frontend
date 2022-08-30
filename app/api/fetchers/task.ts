import { PaginatedResourcesResponse } from "@/app/types/resources/PaginatedResourcesResponse";
import { TaskResource } from "@/app/types/resources/Task";

import $axios from "../$axios";

export const TOKEN_KEY = "token";

export type TaskQuery = {
  search?: string;
  page?: number;
  per_page?: number;
};

export async function getTasks(params: TaskQuery) {
  return await $axios.get<PaginatedResourcesResponse<TaskResource>>(
    "api/tasks",
    { params }
  ).then(res => res.data);
}
