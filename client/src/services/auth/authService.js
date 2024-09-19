import axios from 'axios';
const serverURL = import.meta.env.VITE_DEV_SERVER_URL;

/* User registration function */
const registerUser = async (userData) => {
  try {
    /* Send POST request to the server to register the user and return the user data*/
    const response = await axios.post(`${serverURL}/api/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {registerUser};