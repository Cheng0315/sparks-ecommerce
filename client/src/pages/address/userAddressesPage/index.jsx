import useFetchData from "../../../hooks/useFetchData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { authAxios } from "../../../services/api/authAxios";

const UserAddressesPage = () => {
  const [userAddresses, setUserAddresses] = useState([]);
  const { data, isLoading, error } = useFetchData("/api/addresses");
  const authorizedAxios = authAxios();

  useEffect(() => {
    if (data && data.userAddresses) {
      setUserAddresses(data.userAddresses);
    }
  },[data]);


  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await authorizedAxios.delete(`/api/addresses/${addressId}`);

      if (response.status === 200 && response.data) {
        console.log(response.data.message);
        setUserAddresses(userAddresses.filter((address) => address.addressId !== addressId));
      }
    } catch (error) {
      console.error("Unable to delete address due to the following error: ", error);
    }
  }

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
        <Link to={"/account/addresses/add-address"} className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold">+ Add Address</h3>
        </Link>
        {userAddresses.map((address) => (
          <div key={address.addressId} className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xl font-semibold">{address.firstName} {address.lastName}</h3>
            <p>{address.street} {address.addressUnit}</p>
            <p>{address.city}, {address.state} {address.zipCode}</p>
            <Link to={`/account/addresses/${address.addressId}/edit`}> Edit </Link>
            <Link to="#" onClick={() => handleDeleteAddress(address.addressId)}> Remove </Link> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserAddressesPage;