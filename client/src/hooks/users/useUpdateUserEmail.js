import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../../services/api/authAxios";
import { useSelector } from 'react-redux';
import { setUser } from "../../features/slices";

/* custom hook for handling user email update */
const useUpdateUserEmail = () => {
  const authorizedAxios = authAxios();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateUserEmail = async (values) => {
    try {
      /* Make request to server to update user's email */
      const userData = await authorizedAxios.patch(`/api/users/${user.userId}/update-email`, values);

      /* If email update is successful, update the user */
      if (userData) {
         dispatch(setUser({user: userData.data.user}));
        
      /* Redirect to home page after succesful email update */
        navigate("/my-account");
       }
    } catch (error) {
      console.error("Unable to update email due to the following error: ", error);
    }
  };

  return updateUserEmail;
};

export default useUpdateUserEmail;