import { useParams, Navigate } from "react-router-dom";
import { isPositiveInteger } from "../../../utils/validations";
import useFetchData from "../../../hooks/useFetchData";

const UserProfilePage = () => {
  const { userId } = useParams();
  
  if (!isPositiveInteger(userId)) return <Navigate to="/page-not-found" />;

  const { data, isLoading, error } = useFetchData(`/api/users/${userId}`);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <Navigate to="/page-not-found" />;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {data.user.username}</p>
      <p>Email: {data.user.email}</p>
    </div>
  );
}

export default UserProfilePage;