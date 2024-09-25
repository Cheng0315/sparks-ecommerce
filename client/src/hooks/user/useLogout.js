import { useDispatch } from "react-redux"
import { clearAuth } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { apiAxios } from "../../services/api/authAxios";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await apiAxios.delete("/api/users/logout");
      dispatch(clearAuth());
      navigate("/");
    } catch (error) {
      console.error("Unable to logout due to the following error: ", error);
    }
  }

  return logout;
}

export default useLogout;