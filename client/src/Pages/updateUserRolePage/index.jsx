import { useUpdateUserRole } from "../../hooks/user";

const UpdateUserRole = () => {
  const updateUserRole = useUpdateUserRole();
  
  return (
    <div>
      <h4 className="text-1xl font-bold">Ready to start selling? Become a seller today by clicking the button below</h4>
      <button onClick={updateUserRole} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Register as seller
      </button>
    </div>
  );
};

export default UpdateUserRole;