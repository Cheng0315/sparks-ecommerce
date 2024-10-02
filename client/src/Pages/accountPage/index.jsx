import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

const AccountPage = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  if (!user) return <div>Loading user data...</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold">Hi {user.firstName}</h1>
      <h4 className="text-2xl font-bold">Welcom to your account</h4>
      <div>
        <div>
          <div>Name <Link to="/" className="text-blue-500 underline hover:text-blue-700">Edit</Link></div>
          <div>{user.firstName} {user.lastName} </div>
        </div>
        <div>
          <div>Username </div>
          <div>{user.username}</div>
        </div>
      </div>
      <div>
        <div>Email <Link to="/account/edit-email" className="text-blue-500 underline hover:text-blue-700">Edit</Link></div>
        <div>{user.email}</div>
      </div>
      <div>
        <div>Password <Link to="/account/change-password" className="text-blue-500 underline hover:text-blue-700">Edit</Link></div>
        <div>********</div>
      </div>
    </div>
  );
}

export default AccountPage;