import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth/authService.js";
import { setToken, setUser } from "../../features/slices";

/* custom hook for handling user login */
const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInTheUser = async (values) => {
    try {
      /* Call login function to make request to server to log the user in */
      const userData = await login(values);

      /* If login is successful, update the user and token */
      if (userData) {
        dispatch(setUser({user: userData.user}));
        dispatch(setToken({token: userData.token}));
        
        /* Redirect to home page after succesful login */
        navigate("/");
      }
    } catch (error) {
      console.error("Unable to login due to the following error: ", error);
    }
  };

  return logInTheUser;
};

export default useLogin;