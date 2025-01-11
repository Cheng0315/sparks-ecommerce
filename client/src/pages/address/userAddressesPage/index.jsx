import useFetchData from "../../../hooks/useFetchData";
import { AddressCard } from "../../../components";
import { Link } from "react-router-dom";

const UserAddressesPage = () => {
  const { data, isLoading, error } = useFetchData("/api/addresses");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if (error.response.data.errorMessage === "No addresses found") {
      return (
        <div>
          <h2 className="text-center text-2xl font-bold">You currently don't have any saved addresses.</h2>
          <h2 className="text-center text-2xl font-bold">
            Click <Link to="/account/addresses/add-address" className="text-blue-500">here</Link> to add an address!
          </h2>
        </div>
      )
    }

    return <h2 className="text-center text-2xl font-bold">Error: {error.status}</h2>;
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Your Addresses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.addresses.map((address) => (
          <AddressCard key={address.addressId} address={address} />
        ))}
      </div>
    </div>
  );
}

export default UserAddressesPage;