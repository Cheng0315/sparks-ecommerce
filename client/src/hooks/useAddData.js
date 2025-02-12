import { useDispatch } from "react-redux";
import { authAxios } from "../services/api/authAxios";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../features/slices";

/* custom hook for adding data to the backend */
const useAddData = () => {
  const authorizedAxios = authAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addData = async (url, values) => {
    /* Filter out empty values */
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      const response = await authorizedAxios.post(url, filteredValues);
      const responseData = response?.data;

      if (!responseData) {
        throw new Error("No response data received from server.");
      }

      if (responseData.address) {
        console.log(responseData.message);
        console.log(responseData.address);
        navigate("/account/addresses");
      } else if (responseData.item) {
        console.log(response.data.message);
        console.log(response.data.item);
        dispatch(addItemToCart({ item: responseData.item }));
      }
    } catch (error) {
      console.error("Unable to add the data due to the following error: ", error?.response?.data.errorMessage || error.message);
    }
  };

  return addData;
};

export default useAddData;