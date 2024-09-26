import { Link } from 'react-router-dom';
import { useLogout } from "../hooks/users";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.user.user);

  const logout = useLogout()

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Sparks eCommerce</div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          {user ? <button onClick={logout} className="text-gray-300 hover:text-white">Logout</button> : ""}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;