import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth/authService.js";
import { setToken, setUser } from "../../features/slices";

/* custom hook for handling user registration */
const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (values) => {
    try {
      /* Call registerUser function to make request to server to register the user */
      const userData = await registerUser(values);

      /* If register is successful, update the user and token */
      if (userData) {
        dispatch(setUser({user: userData.user}));
        dispatch(setToken({token: userData.token}));

        /* Redirect to home page after succesful registration */
        navigate("/");
      }
    } catch (error) {
      console.error("Unable to register due to the following error: ", error);
    }
  };

  return register;
};

export default useRegister;