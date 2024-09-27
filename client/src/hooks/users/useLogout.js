import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { apiAxios } from "../../services/api/authAxios";
import { clearToken, clearUser } from "../../features/slices";

/* custom hook for handling user logout */
const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {

      /* Make request to backend to delete refresh token on frontend and backend*/
      const response = await apiAxios.delete("/api/users/logout");
      
      /* Clear user and access token on frontend */
      dispatch(clearUser());
      dispatch(clearToken());
      navigate("/");
    } catch (error) {
      console.error("Unable to logout due to the following error: ", error);
    }
  }

  return logout;
}

export default useLogout;