import { authAxios } from "../../services/api/authAxios";
import { useNavigate } from "react-router-dom";
import { createFormData } from "../../utils/product";

/* custom hook for updating product */
const useUpdateProduct = () => {
  const authorizedAxios = authAxios();
  const navigate = useNavigate();

  const updateProduct = async (values) => {
    try {
      const allowFields = ["name", "description", "condition", "price", "stockQuantity", "categoryId", "productImage"];
      const formData = createFormData(values, allowFields)

      const response = await authorizedAxios.patch(`/api/products/${values.productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });


      if (response && response.data) {
        navigate(`/products/${response.data.product.productId}`);
      }
    } catch (error) {
      console.error("Unable to update product due to the following error: ", error);
    }
  };

  return updateProduct;
};

export default useUpdateProduct;