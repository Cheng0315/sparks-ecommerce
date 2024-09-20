import axios from 'axios';
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

/* User registration service */
const registerUser = async (userData) => {
  try {
    /* Send POST request to the server to register the user and return the user data*/
    const response = await axios.post(`${serverURL}/api/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* User login service */
const login = async (userData) => {
  try {
    /* Send POST request to the server to log the user in*/
    const response = await axios.post(`${serverURL}/api/users/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {registerUser, login};