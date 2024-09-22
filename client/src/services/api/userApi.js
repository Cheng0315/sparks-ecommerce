import {authAxios} from "./authAxios"

/* Make GET request to backend to get the user based on id and update viewedUser */
const getAndSetViewedUser = async (id, token, setViewedUser, dispatch) => {
  try {
    const authorizedAxios = authAxios(token, dispatch);
    const response = await authorizedAxios.get(`/api/users/${id}`);
    setViewedUser(response.data);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

export { getAndSetViewedUser };