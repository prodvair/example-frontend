import { PaginatedResourcesResponse } from "@/app/types/resources/PaginatedResourcesResponse";
import { TaskResource } from "@/app/types/resources/Task";

import $axios from "../$axios";

const TASK_PATH = "api/tasks";

/**
 * Task query params interface for filtration
 */
export interface TaskQuery {
  search?: string;
  page?: number;
  per_page?: number;
};

/**
 * Task request params interface
 */
export interface TaskRequest {
  title: string;
  content: string;
  color?: "green" | "red" | "purple" | "yellow" | "blue" | "orange";
};

/**
 * Task response interface for create & update
 */
export interface TaskResponse {
  data: TaskResource;
};

/**
 * Task response interface for delete
 */
export interface TaskDeleteResponse {
  message: string;
};

/**
 * Function for get task list with filtration
 * 
 * @param params TaskQuery
 * @returns PaginatedResourcesResponse<TaskResource>
 */
export async function getTasks(params: TaskQuery) {
  return await $axios
    .get<PaginatedResourcesResponse<TaskResource>>(TASK_PATH, { params })
    .then((res) => res.data);
}

/**
 * Function for create a new task
 * 
 * @param data TaskRequest
 * @returns TaskResponse
 */
export async function createTasks(data: TaskRequest) {
  return await $axios
    .post<TaskResponse>(TASK_PATH, data)
    .then((res) => res.data);
}

/**
 * Function for update task
 * 
 * @param _id string
 * @param data TaskRequest
 * @returns TaskResponse
 */
export async function updateTasks(_id: string, data: TaskRequest) {
  return await $axios
    .put<TaskResponse>(`${TASK_PATH}/${_id}`, data)
    .then((res) => res.data);
}

/**
 * function for delete task
 * 
 * @param _id string  
 * @returns TaskDeleteResponse
 */
export async function removeTasks(_id: string) {
  return await $axios
    .delete<TaskDeleteResponse>(`${TASK_PATH}/${_id}`)
    .then((res) => res.data);
}