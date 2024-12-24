import { Link } from "react-router-dom";
import { useLogout } from "../hooks/user";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);

  const logout = useLogout()

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Sparks eCommerce</Link>
        <div className="space-x-4">
          {user ? (
            <>
              {user.role === "user" ? <Link to="/account/update-role" className="text-gray-300 hover:text-white">Become A Seller</Link> : ""}
              <Link to="/account" className="text-gray-300 hover:text-white">Account</Link>
              <button onClick={logout} className="text-gray-300 hover:text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;