import { Link } from "react-router-dom";

const AddressCard = ({ address }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
      <h3 className="text-xl font-semibold">{address.firstName} {address.lastName}</h3>
      <p>{address.street} {address.addressUnit}</p>
      <p>{address.city}, {address.state} {address.zipCode}</p>
      <Link to={`/account/addresses/${address.addressId}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-center" > Edit </Link> 
    </div>
  );
};

  export default AddressCard;