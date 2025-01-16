import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountPage = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <h1 className="text-4xl font-bold">Hi {user.firstName}</h1>
      <h4 className="text-2xl font-bold">Welcom to your account</h4>
      <Link to={"/account/manage"}>
        <div className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold">Contact info, email, and password</h3>
        </div>
      </Link>
      <Link to={"/account/products"}>
        <div className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold">Your Products</h3>
        </div>
      </Link>
      <Link to={"/account/addresses"}>
        <div className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold">Adresses</h3>
        </div>
      </Link>
    </div>
  );
}

export default AccountPage;