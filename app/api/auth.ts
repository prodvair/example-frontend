import axios from "axios";
import { type } from "os";
import { Interface } from "readline";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMEN, //import.meta.env теперь
  mode: "no-cors",
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

type ApiType = "login" | "register" | "refresh" | "me";

let options;
const api = async (
  type: ApiType,
  data?: Record<string, any>,
  headers?: Record<string, any>
) => {
  const links = type.split(":");
  const url = `/api/${links[0]}${links[1] ? `/${links[1]}` : ""}`;
  switch (type) {
    case "login":
      options = {
        method: "POST",
        data,
      };
      break;
    case "register":
      options = {
        method: "post",
        data,
      };
      break;
    case "refresh":
      options = {
        method: "post",
        data,
      };
      break;
    case "me":
      options = {
        method: "get",
      };
      break;
  }

  const res = await instance({
    ...options,
    url,
    headers,
  });
  return res.data;
};

api("login", { a: "asd" });

export default api;
