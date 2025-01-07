import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../../services/api/authAxios";
import { setAccessToken, setUser } from "../../features/slices";

/* custom hook for handling user data updates */
const useUpdateUserData = () => {
  const authorizedAxios = authAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateUserData = async (url, values = {}) => {
    try {
      /* Make request to server to update user data */
      const response = await authorizedAxios.patch(url, values);

      /* If user data update is successful, update the user state and display success message to user*/
      if (response && response.data) {
        dispatch(setUser({user: response.data.user}));

        if (response.data.accessToken) {
          dispatch(setAccessToken({accessToken: response.data.accessToken}));
        }

        console.log(response.data.message);
      /* Redirect to account page after succesful user data update */
        navigate("/account");
       }
    } catch (error) {
      console.error("Unable to update user data due to the following error: ", error);
    }
  };

  return updateUserData;
};

export default useUpdateUserData;