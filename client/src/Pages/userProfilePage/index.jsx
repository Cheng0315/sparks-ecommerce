import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAndSetViewedUser } from "../../services/api/userApi.js";

const UserProfilePage = () => {
  const [viewedUser, setViewedUser] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();
  const dispatch = useDispatch();

  /* Call getAndSetViewedUser to update viewedUser based on id change*/
  useEffect(() => {
    getAndSetViewedUser(id, token, setViewedUser, dispatch);
  }, [id]);

  if (!viewedUser) return <div>Loading user data or unauthorized access.</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {viewedUser.username}</p>
      <p>Email: {viewedUser.email}</p>
    </div>
  );
}

export default UserProfilePage;