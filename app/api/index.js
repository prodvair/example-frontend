import { services } from "@/config/api";
import axios from "axios";

// const protocol = process.env.NODE_ENV === "production" ? "https" : "https";
const instance = axios.create({
  baseURL: services.constructor,
  mode: "no-cors",
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

let options;
const api = async ({ name, type }, data) => {
  const { _id } = data;
  const url = `/${name}/${type}`;
  // console.log(
  //   1,
  //   url,
  //   {
  //     baseURL: services.VUE_APP_CONSTRUCTOR_API,
  //     mode: "no-cors",
  //     headers: { "Content-Type": "application/json;charset=utf-8" },
  //   },
  //   services
  // );

  switch (type) {
    case "create":
      options = {
        method: "post",
        url,
        data,
      };
      // alert('create');
      break;
    case "ubdate":
      options = {
        method: "put",
        url: `${url}/${ID}`,
        data,
      };
      break;
    case "get":
      options = {
        method: "get",
        url: `${url}/${ID}`,
      };
      break;
    case "get-list":
      options = {
        method: "get",
        url: `${url}/${ID}`,
      };
      break;
    case "get-list-project":
      options = {
        method: "get",
        url: `${url}/${ID}`,
      };
      break;
    case "get-list-button":
      options = {
        method: "get",
        url: `${url}/${ID}`,
      };
      break;
    case "update":
      delete data.ID;
      options = {
        method: "put",
        url: `${url}/${ID}`,
        data,
      };
      break;
    case "delete":
      options = {
        method: "delete",
        url: `${url}/${ID}`,
        data,
      };
      break;
    default:
      return instance;
  }

  const res = await instance(options);
  return res.data;
};
api.setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  instance.defaults.headers.common["X-Auth-Token"] = `Bearer ${token}`;
};
api.removeToken = () => {
  delete instance.defaults.headers.common.Authorization;
  delete instance.defaults.headers.common["X-Auth-Token"];
};

export default api;
