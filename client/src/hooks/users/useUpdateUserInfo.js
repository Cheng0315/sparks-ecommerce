import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../../services/api/authAxios";
import { useSelector } from 'react-redux';
import { setUser } from "../../features/slices";

/* custom hook for handling user information updates */
const useUpdateUserInfo = () => {
  const authorizedAxios = authAxios();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateUserInfo = async (values) => {
    try {
      /* Make request to server to update user's info */
      const response = await authorizedAxios.patch(`/api/users/${user.userId}/update-info`, values);

      /* If user info update is successful, update the user state and display success message to user*/
      if (response) {
        dispatch(setUser({user: response.data.user}));
        console.log(response.data.message);
      /* Redirect to account page after succesful user info update */
        navigate("/account");
       }
    } catch (error) {
      console.error("Unable to update email due to the following error: ", error);
    }
  };

  return updateUserInfo;
};

export default useUpdateUserInfo;