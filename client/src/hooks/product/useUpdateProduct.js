import { authAxios } from "../../services/api/authAxios";
import { useNavigate } from "react-router-dom";

/* custom hook for updating product */
const useUpdateProduct = () => {
  const authorizedAxios = authAxios();
  const navigate = useNavigate();

  const updateProduct = async (values) => {
    try {
      const formData = new FormData();
      const allowFields = ["name", "description", "condition", "price", "stockQuantity", "categoryId", "productImage"];

      allowFields.forEach(field => {
        if (values[field]) {
          formData.append(field, values[field]);
        }
      });

      const response = await authorizedAxios.patch(`/api/products/${values.productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });


      if (response) {
        navigate(`/products/${response.data.product.productId}`);
      }
    } catch (error) {
      console.error("Unable to update product due to the following error: ", error);
    }
  };

  return updateProduct;
};

export default useUpdateProduct;