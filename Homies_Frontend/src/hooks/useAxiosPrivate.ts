import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios, { axiosPrivate } from "../api/axiosInstance";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { accessToken, IUserData } from "../storeAndSlices/userSlice";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // Optional property for tracking retries
}

const useAxiosPrivate = () => {
  const dispatch = useAppDispatch();
  // const user = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.user.token);
  const refresh = async () => {
    const config = {
      withCredentials: true,
    };
    const response = await axios.get("users/refreshaccesstoken", config);
    const data: IUserData = {
      token: response?.data.accessToken,
    };
    dispatch(accessToken(data.token));
    return response;
  };

  axiosPrivate.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  axiosPrivate.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      // const previousRequest = error?.config;
      const previousRequest = error.config as CustomAxiosRequestConfig;
      if (
        error?.isAxiosError &&
        previousRequest !== undefined &&
        !previousRequest._retry
      ) {
        previousRequest._retry = true;
        try {
          const newAccessToken = await refresh();
          // console.log(newAccessToken?.data.accessToken);
          previousRequest.headers.Authorization = `Bearer ${newAccessToken?.data.accessToken}`;
          return axiosPrivate(previousRequest);
        } catch (error) {
          console.log(error);
        }
      }

      return Promise.reject(error);
    }
  );
  return axiosPrivate;
};

export default useAxiosPrivate;
