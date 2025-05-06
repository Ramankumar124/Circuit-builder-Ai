import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { properties } from "./properties/properties";

const Api = axios.create({
  baseURL: `${properties?.PUBLIC_BASE_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        await axios.post("/auth/refresh-token", {}, { withCredentials: true });

        return Api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default Api;
