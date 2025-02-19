import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { apiAxios } from "../../services/api/authAxios";
import { clearAccessToken, clearGuestCart, clearUser } from "../../features/slices";

/* custom hook for handling user logout */
const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    /* Clear user and access token on frontend */
    dispatch(clearUser());
    dispatch(clearAccessToken());
    try {
      /* Make request to backend to delete refresh token on frontend and backend*/
      const response = await apiAxios.delete("/api/users/logout");
      
      navigate("/");
    } catch (error) {
      console.error("Unable to logout due to the following error: ", error);
    }
  }

  return logout;
}

export default useLogout;