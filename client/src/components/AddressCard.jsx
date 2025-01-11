const AddressCard = ({ address }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
      <h3 className="text-xl font-semibold">{address.firstName} {address.lastName}</h3>
      <p>{address.street} {address.addressUnit}</p>
      <p>{address.city} {address.state}, {address.zipCode}</p>
    </div>
  );
};

  export default AddressCard;