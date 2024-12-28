import { useNavigate } from "react-router-dom";
import { authAxios } from "../../services/api/authAxios";
import { useSelector } from 'react-redux';

/* custom hook for handling user password change */
const useUpdateUserPassword = () => {
  const authorizedAxios = authAxios();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const updateUserPassword = async (values) => {
    try {
      /* Make request to server to update user's password */
      const response = await authorizedAxios.patch(`/api/users/${user.userId}/change-password`, values);

      /* If password update is successful, display success message to user */
      if (response && response.data) {
        console.log(response.data.message);
      /* Redirect to account page after succesful password change */
        navigate("/account");
       }
    } catch (error) {
      console.error("Unable to update password due to the following error: ", error);
    }
  };

  return updateUserPassword;
};

export default useUpdateUserPassword;