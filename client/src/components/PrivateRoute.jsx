import { useSelector} from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useCheckAccessToken } from "../hooks/users";
import { useState } from "react";


const PrivateRoute = () => {
  const accessToken = useSelector((state) => state.token.token);
  const [loading, setLoading] = useState(true);

  /* Call custom hook to check and renew access token if needed */
  useCheckAccessToken(accessToken, setLoading);

  if (loading) {
    return <div>Loading...</div>;
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
  
}

export default PrivateRoute;