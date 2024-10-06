import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useGetAndSetViewedUser } from "../../hooks/users";

const UserProfilePage = () => {
  const [viewedUser, setViewedUser] = useState(null);
  const { userId } = useParams();

  /* Call useGetAndSetViewedUser hook to update viewedUser based on id change*/
  useGetAndSetViewedUser(userId, setViewedUser);

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