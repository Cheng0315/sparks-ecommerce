import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountPage = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <h1 className="text-4xl font-bold">Hi {user.firstName}</h1>
      <h4 className="text-2xl font-bold">Welcom to your account</h4>
      <div className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
        <Link to={"/account/manage"}>
          <h3 className="text-xl font-semibold">Contact info, email, and password</h3>
        </Link>
      </div>
      <div className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
        <Link to={"/account/products"}>
          <h3 className="text-xl font-semibold">Your Products</h3>
        </Link>
      </div>
      <div className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
        <Link to={"/account/addresses"}>
          <h3 className="text-xl font-semibold">Adresses</h3>
        </Link>
      </div>
    </div>
  );
}

export default AccountPage;