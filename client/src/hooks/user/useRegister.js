import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../features/auth/authSlice.js";
import { registerUser } from "../../services/auth/authService.js";

const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (values) => {
    try {
      const data = await registerUser(values);

      if (data) {
        dispatch(
          setAuth({
            user: data.user,
            token: data.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Unable to register due to the following error: ", error);
    }
  };

  return register;
};

export default useRegister;