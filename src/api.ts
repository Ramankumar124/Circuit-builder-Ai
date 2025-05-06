import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { properties } from "./properties/properties";
import { useNavigate } from "react-router-dom";

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
      originalRequest._retry = true; 
      try {
        await axios.post(
          `${properties.PUBLIC_BASE_URL}/api/v1/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        return Api(originalRequest);
      } catch (refreshError) {
        const navigate = useNavigate();
        navigate("/login");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default Api;
