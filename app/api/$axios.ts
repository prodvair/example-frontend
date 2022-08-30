import axios from "axios";

import { isClient } from "../constants/isClient";
import { TOKEN_KEY } from "./fetchers/auth";

const $axios = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_DOMEN,
  headers: {
    accept: "application/json",
  },
});

const removeToken = () => {
  delete $axios.defaults.headers.common.Authorization;
};

$axios.interceptors.request.use((config) => {
  if (!isClient) return config;
  console.log(config);

  const token = localStorage.getItem(TOKEN_KEY);

  if (token)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  return config;
});

export default $axios;

export { removeToken };
