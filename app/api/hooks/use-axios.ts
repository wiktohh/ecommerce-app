"use client";
import Cookies from "js-cookie";
import axios from "axios";

const getToken = () => {
  const token = Cookies.get("next-auth.session-token");
  return token;
};

export const useAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
