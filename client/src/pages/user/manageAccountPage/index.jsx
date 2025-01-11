import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ManageAccountPage = () => {
  const user = useSelector((state) => state.user.user);
  
  const accountType = user.role === "user" ? "User" : user.role === "seller" ? "Seller" : "";

  return (
    <div>
      <h4 className="text-2xl font-bold">Your account information</h4>
      <div>
        <div>
          <div>Account Type: {accountType ? accountType : "Loading..."}</div>
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

export default ManageAccountPage;