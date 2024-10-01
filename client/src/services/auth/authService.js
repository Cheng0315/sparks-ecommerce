import { apiAxios } from '../api/authAxios';

/* User registration service */
const registerUser = async (userData) => {
  try {
    /* Send POST request to the server to register the user and return the user data*/
    const response = await apiAxios.post(`/api/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Unable to register due to the following error: ', error);
    throw error;
  }
};

/* User login service */
const login = async (userData) => {
  try {
    /* Send POST request to the server to log the user in*/
    const response = await apiAxios.post(`/api/users/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Unable to login due to the following error: ', error);
    throw error;
  }
};

export {registerUser, login};