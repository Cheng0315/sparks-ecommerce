import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAndSetViewedUser } from "../../services/api/userApi.js";


const UserProfilePage = () => {
  const [viewedUser, setViewedUser] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();

  useEffect(() => {
    /* Call getAndSetViewedUser function to update the viewedUser state */
    getAndSetViewedUser(id, token, setViewedUser);
  }, [id]);

  if (!viewedUser) return <div>Unauthorized or the user you are looking for does not exists.</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {viewedUser.username}</p>
      <p>Name: {viewedUser.email}</p>
    </div>
  );
}

export default UserProfilePage;