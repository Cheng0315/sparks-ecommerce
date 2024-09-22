import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../features/auth/authSlice.js";
import { login } from "../../services/auth/authService.js";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInTheUser = async (values) => {
    try {
      const data = await login(values);

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
      console.error("Unable to login due to the following error: ", error);
    }
  };

  return logInTheUser;
};

export default useLogin;