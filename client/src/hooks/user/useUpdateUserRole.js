import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../../services/api/authAxios";
import { useSelector } from 'react-redux';
import { setAccessToken, setUser } from "../../features/slices";

/* custom hook for handling user role updates */
const useUpdateUserRole = () => {
  const authorizedAxios = authAxios();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateUserRole = async () => {
    try {
      /* Make request to server to update user role */
      const response = await authorizedAxios.patch(`/api/users/${user.userId}/update-role`);

      /* If user role update is successful, update the user state, token, and display success message to user */
      if (response && response.data) {
        dispatch(setUser({user: response.data.user}));
        dispatch(setAccessToken({accessToken: response.data.accessToken}));
        console.log(response.data.message);
      /* Redirect to account page after succesful user role update */
        navigate("/account");
       }
    } catch (error) {
      console.error("Unable to update user role due to the following error: ", error);
    }
  };

  return updateUserRole;
};

export default useUpdateUserRole;