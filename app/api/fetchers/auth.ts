import { UserResource } from "@/app/types/resources/User";

import $axios from "../$axios";


/**
 * Constant for token name key in local storage 
 */
export const TOKEN_KEY = "token";

/**
 * Login request params interface
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Registration request params interface
 */
export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

/**
 * Authorization response interface
 */
export interface AuthorizationResponse {
  token: string;
  type: string;
}

/**
 * Login response params interface
 */
export interface LoginResponse {
  user: UserResource;
  authorization: AuthorizationResponse;
}

/**
 * Registration response params interface
 */
export interface RegisterResponse {
  message: string;
  user: UserResource;
  authorization: AuthorizationResponse;
}

/**
 * Auth user response params interface
 */
export interface MeResponse {
  user: UserResource;
}

/**
 * Function for login request
 *
 * @param data LoginRequest
 * @returns LoginResponse
 */
export async function login(data: LoginRequest) {
  return await $axios.post<LoginResponse>("api/login", data).then((res) => {
    localStorage.setItem(TOKEN_KEY, res.data.authorization.token);
    return res;
  });
}

/**
 * Function for logout request
 *
 * @returns AxiosResponse
 */
export async function logout() {
  return await $axios.post("api/logout").then(() => {
    localStorage.removeItem(TOKEN_KEY);
  });
}

/**
 * Function for registration request
 *
 * @param data RegisterRequest
 * @returns RegisterResponse
 */
export async function register(data: RegisterRequest) {
  return await $axios
    .post<RegisterResponse>("api/register", data)
    .then((res) => {
      localStorage.setItem(TOKEN_KEY, res.data.authorization.token);
      return res;
    });
}

/**
 * Function for refresh token request
 *
 * @returns RegisterResponse
 */
export async function refresh() {
  return await $axios.post<RegisterResponse>("api/refresh").then((res) => {
    localStorage.setItem(TOKEN_KEY, res.data.authorization.token);
    return res;
  });
}

/**
 * Function for request to get authenticated user data
 *
 * @returns MeResponse
 */
export async function me() {
  return await $axios
    .get<MeResponse>("api/me")
    .then((res) => res.data?.user || null).catch(() => null)
}
