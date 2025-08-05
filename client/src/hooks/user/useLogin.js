import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearGuestCart, setAccessToken, setUser } from "../../features/slices";
import { apiAxios } from "../../services/api/authAxios";

/* custom hook for handling user login */
const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      /* Call login function to make request to server to log the user in */
      const response = await apiAxios.post(`/api/users/login`, values);

      /* If login is successful, update the user and token */
      if (response && response.data) {
        dispatch(setUser({user: response.data.user}));
        dispatch(setAccessToken({accessToken: response.data.accessToken}));
        dispatch(clearGuestCart());
        /* Redirect to home page after succesful login */
        navigate("/");
      }
    } catch (error) {
      console.error("Unable to login due to the following error: ", error);
    }
  };

  return login;
};

export default useLogin;