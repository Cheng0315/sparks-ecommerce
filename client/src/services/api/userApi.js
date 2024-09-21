import axios from 'axios';
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

const getAndSetViewedUser = async (id, token, setViewedUser) => {
  
  const authorizedAxios = axios.create({
    baseURL: serverURL,
    withCredentials: true,
  });
  
  authorizedAxios.interceptors.request.use((config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
  
  const response = await authorizedAxios.get(`/api/users/${id}`);
  setViewedUser(response.data);
}

export {getAndSetViewedUser};