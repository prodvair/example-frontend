import axios from "axios";

import { isClient } from "../constants/isClient";
import { TOKEN_KEY } from "./fetchers/auth";

/**
 * Create Axios default params
 */
const $axios = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_DOMEN,
  headers: {
    accept: "application/json",
  },
});

/**
 * Function for remove token on request header
 */
export const removeToken = () => {
  delete $axios.defaults.headers.common.Authorization;
};

/**
 * Function for add token on request header, if it has.
 */
$axios.interceptors.request.use((config) => {
  if (!isClient) return config;

  const token = localStorage.getItem(TOKEN_KEY);

  if (token)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  return config;
});

export default $axios;
