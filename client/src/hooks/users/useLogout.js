import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { apiAxios } from "../../services/api/authAxios";
import { clearToken, clearUser } from "../../features/slices";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await apiAxios.delete("/api/users/logout");
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