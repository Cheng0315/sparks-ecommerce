import { authAxios } from "../../services/api/authAxios";
import { useNavigate } from "react-router-dom";

/* custom hook for deleting product */
const useDeleteProduct = () => {
  const authorizedAxios = authAxios();
  const navigate = useNavigate();

  const deleteProduct = async (productId) => {
    try {
      const response = await authorizedAxios.delete(`/api/products/${productId}`);

      if (response.status === 200 && response.data) {
        console.log(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Unable to delete product due to the following error: ", error);
    }
  };

  return deleteProduct;
};

export default useDeleteProduct;