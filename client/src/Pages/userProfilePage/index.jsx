import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useGetAndSetViewedUser } from "../../hooks/user/useGetAndSetViewedUser";

const UserProfilePage = () => {
  const [viewedUser, setViewedUser] = useState(null);
  const { id } = useParams();

  /* Call useGetAndSetViewedUser hook to update viewedUser based on id change*/
  useGetAndSetViewedUser(id, setViewedUser);

  if (!viewedUser) return <div>Loading user data...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {viewedUser.username}</p>
      <p>Email: {viewedUser.email}</p>
    </div>
  );
}

export default UserProfilePage;