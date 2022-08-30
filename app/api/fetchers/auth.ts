import { UserResource } from "@/app/types/resources/User";

import $axios from "../$axios";

export const TOKEN_KEY = "token";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserResource;
  authorization: {
    token: string;
    type: string;
  };
}

export async function login(data: LoginRequest) {
  return await $axios.post<LoginResponse>("api/login", data).then((res) => {
    localStorage.setItem(TOKEN_KEY, res.data.authorization.token);
    return res;
  });
}

export async function logout() {
  return await $axios.post("api/logout").then(() => {
    localStorage.removeItem(TOKEN_KEY);
  });
}

export async function me() {
  return await $axios.get<LoginResponse>("api/me").then(res => res.data?.user || null).catch(() => null)
}
