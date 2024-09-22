import axios from 'axios';
import { setAuth } from "../../features/auth/authSlice.js";
import { useSelector, useDispatch } from 'react-redux';
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

/* Axios instance for making request to backend with authorization token */
const authAxios = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  
  const axiosInstance = axios.create({
    baseURL: serverURL,
    withCredentials: true,
  });

  /* Set Bearer access token in headers */
  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  })
  
  /* Use Axios interceptors to make a request to renew access tokens and refresh tokens if access token is invalid */
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const initialRequest = error.config;
      if (error.response.status === 401 && !initialRequest.retryRequest) {
        initialRequest.retryRequest = true;
        try {
          const { data } = await axiosInstance.post("/api/users/renew-tokens");
          dispatch(
            setAuth ({
              user: data.user,
              token: data.token
            })
          );
          initialRequest.headers['Authorization'] = `Bearer ${data.token}`;
          return axiosInstance(initialRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  )

  return axiosInstance;
};

export { authAxios };