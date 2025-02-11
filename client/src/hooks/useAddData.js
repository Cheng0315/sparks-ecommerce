import { authAxios } from "../services/api/authAxios";
import { useNavigate } from "react-router-dom";

/* custom hook for adding data to the backend */
const useAddData = () => {
  const authorizedAxios = authAxios();
  const navigate = useNavigate();

  const addData = async (url, values) => {
    /* Filter out empty values */
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      const response = await authorizedAxios.post(url, filteredValues);

      if (response && response.data.address) {
        console.log(response.data);
        navigate("/account/addresses");
      } else if (response && response.data.item) {
        console.log(response.data.item);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Unable to add the data due to the following error: ", error);
    }
  };

  return addData;
};

export default useAddData;