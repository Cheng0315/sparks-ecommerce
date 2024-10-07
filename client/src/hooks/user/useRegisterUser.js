import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setUser } from "../../features/slices";
import { apiAxios } from "../../services/api/authAxios";

/* custom hook for handling user registration */
const useRegisterUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = async (values) => {
    try {
      /* Call registerUser function to make request to server to register the user */
      const response = await apiAxios.post(`/api/users/register`, values);

      /* If register is successful, update the user and token */
      if (response) {
        dispatch(setUser({user: response.data.user}));
        dispatch(setAccessToken({accessToken: response.data.accessToken}));

        /* Redirect to home page after succesful registration */
        navigate("/");
      }
    } catch (error) {
      console.error("Unable to register due to the following error: ", error);
    }
  };

  return registerUser;
};

export default useRegisterUser;