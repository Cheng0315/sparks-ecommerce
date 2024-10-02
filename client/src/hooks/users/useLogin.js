import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../features/slices";
import { apiAxios } from "../../services/api/authAxios";

/* custom hook for handling user login */
const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      /* Call login function to make request to server to log the user in */
      const response = await apiAxios.post(`/api/users/login`, values);;

      /* If login is successful, update the user and token */
      if (response) {
        dispatch(setUser({user: response.data.user}));
        dispatch(setToken({token: response.data.token}));
        
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