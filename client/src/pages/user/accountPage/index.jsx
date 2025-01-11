import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const AccountPage = () => {
  const user = useSelector((state) => state.user.user);
  
  const accountType = user.role === "user" ? "User" : user.role === "seller" ? "Seller" : "";

  return (
    <div>
      <h1 className="text-4xl font-bold">Hi {user.firstName}</h1>
      <h4 className="text-2xl font-bold">Welcom to your account</h4>
      <div>
        <div>
          <div>Account Type</div>
          <div>{accountType ? accountType : "Loading..."}</div>
        </div>
        <div>
          <div>Name <Link to="/account/edit-info" className="text-blue-500 underline hover:text-blue-700">Edit</Link></div>
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