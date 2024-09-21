import axios from 'axios';
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

/* Axios instance for making request to backend with authorization token */
const authAxios = (token) => {
  const axiosInstance = axios.create({
    baseURL: serverURL,
    withCredentials: true,
  });

  /* Set Bearer token in headers */
  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  })
  

  return axiosInstance;
};

export {authAxios};