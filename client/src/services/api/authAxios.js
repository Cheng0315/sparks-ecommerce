import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setUser } from "../../features/slices";
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

/* Axios instance for making request the the server with credentials */
const apiAxios = axios.create({
  baseURL: serverURL,
  withCredentials: true,
});

/* Axios instance for making request to the server with credentials and interceptors */
const authAxios = () => {
  const accessToken = useSelector((state) => state.token.accessToken);
  const dispatch = useDispatch();
  
  const axiosInstance = axios.create({
    baseURL: serverURL,
    withCredentials: true,
  });

  /* Set Bearer access token in headers */
  axiosInstance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  })
  
  /* Use Axios interceptors to make a request to renew access tokens and refresh tokens if access token is invalid */
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const initialRequest = error.config;
      if (error.response && error.response.status === 401 && !initialRequest.retryRequest) {
        initialRequest.retryRequest = true;
        try {
          const response = await axiosInstance.post("/api/users/renew-tokens");
          dispatch(setUser({user: response.data.user}));
          dispatch(setAccessToken({accessToken: response.data.accessToken}));
          initialRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
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

export { authAxios, apiAxios };