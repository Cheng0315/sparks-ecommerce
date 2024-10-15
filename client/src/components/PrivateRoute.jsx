import { useSelector} from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthenticateUser } from "../hooks/user";
import { useState } from "react";


const PrivateRoute = () => {
  const accessToken = useSelector((state) => state.token.accessToken);
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  /* Call custom hook to check and renew access token if needed */
  useAuthenticateUser(accessToken, user, setLoading);

  if (loading) {
    return <div>Loading...</div>;
  }

  return accessToken && user ? <Outlet /> : <Navigate to="/login" />;
  
}

export default PrivateRoute;