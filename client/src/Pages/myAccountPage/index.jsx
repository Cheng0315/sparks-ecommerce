import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const MyAccountPage = () => {
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
          <div>Name <a href="/" className="text-blue-500 underline hover:text-blue-700">Edit</a></div>
          <div>{user.firstName} {user.lastName} </div>
        </div>
        <div>
          <div>Username </div>
          <div>{user.username}</div>
        </div>
      </div>
      <div>
        <div>Email <a href="/" className="text-blue-500 underline hover:text-blue-700">Edit</a></div>
        <div>{user.email}</div>
      </div>
      <div>
        <div>Password <a href="/" className="text-blue-500 underline hover:text-blue-700">Edit</a></div>
        <div>********</div>
      </div>
    </div>
  );
}

export default MyAccountPage;