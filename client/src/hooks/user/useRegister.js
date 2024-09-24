import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../features/auth/authSlice.js";
import { registerUser } from "../../services/auth/authService.js";

/* custom hook for handling user registration */
const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (values) => {
    try {
      /* Call registerUser function to make request to server to register the user */
      const data = await registerUser(values);

      /* If register is successful, update the user and token */
      if (data) {
        dispatch(
          setAuth({
            user: data.user,
            token: data.token,
          })
        );
        /* Redirect to home page after succesful login */
        navigate("/");
      }
    } catch (error) {
      console.error("Unable to register due to the following error: ", error);
    }
  };

  return register;
};

export default useRegister;