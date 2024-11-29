import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useGetAndSetViewedUser } from "../../hooks/user";

const UserProfilePage = () => {
  const [viewedUser, setViewedUser] = useState(null);
  const [viewedUserNotFound, setViewedUserNotFound] = useState(false);
  const { userId } = useParams();

  /* Call useGetAndSetViewedUser hook to update viewedUser based on id change*/
  useGetAndSetViewedUser(userId, setViewedUser, setViewedUserNotFound);

  if (viewedUserNotFound) return <Navigate to="/page-not-found" />;

  if (!viewedUser) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {viewedUser.username}</p>
      <p>Email: {viewedUser.email}</p>
    </div>
  );
}

export default UserProfilePage;