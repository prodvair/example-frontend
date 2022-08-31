import { PaginatedResourcesResponse } from "@/app/types/resources/PaginatedResourcesResponse";
import { TaskResource } from "@/app/types/resources/Task";
import { UserResource } from "@/app/types/resources/User";

import $axios from "../$axios";

/**
 * User request params interface
 */
export interface UserRequest {
  first_name?: string;
  last_name?: string;
  email: string;
  birthday?: string;
};

/**
 * User password change request params interface
 */
 export interface UserPasswordRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

/**
 * User response interface for update data
 */
export interface UserResponse {
  data: UserResource;
};

/**
 * Function for update user
 * 
 * @param data UserRequest
 * @returns UserResponse
 */
export async function updateUser(data: UserRequest) {
  return await $axios
    .put<UserResponse>(`api/user/update`, data)
    .then((res) => res.data);
}

/**
 * Function for update user password
 * 
 * @param data UserPasswordRequest
 * @returns UserResponse
 */
 export async function updateUserPassword(data: UserPasswordRequest) {
  return await $axios
    .put<UserResponse>(`api/user/update_password`, data)
    .then((res) => res.data);
}
