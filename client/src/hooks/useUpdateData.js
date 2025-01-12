import { useNavigate } from "react-router-dom";
import { authAxios } from "../services/api/authAxios";

/* custom hook for handling data updates */
const useUpdateData = () => {
  const authorizedAxios = authAxios();
  const navigate = useNavigate();

  const updateData = async (url, newValues, originalValues) => {
    /* Filter out values that have not changed */
    const filteredValues = Object.fromEntries(Object.entries(newValues).filter(([key, value]) => value !== originalValues[key]));
    
    try {
      /* Make request to server to update data */
      const response = await authorizedAxios.patch(url, filteredValues);

      if (response && response.data) {
        if (response.data.address) {
          console.log(response.data.message);
          navigate("/account/addresses");
        }
       }
    } catch (error) {
      console.error("Unable to update data due to the following error: ", error);
    }
  };

  return updateData;
};

export default useUpdateData;