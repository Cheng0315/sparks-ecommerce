import { authAxios } from "../../services/api/authAxios";
import { useNavigate } from "react-router-dom";
import { createFormData } from "../../utils/product";

/* custom hook for adding product */
const useAddProduct = () => {
  const authorizedAxios = authAxios();
  const navigate = useNavigate();

  const addProduct = async (values ) => {
    try {
      const allowFields = ["name", "description", "condition", "price", "stockQuantity", "categoryId", "productImage"];
      const formData = createFormData(values, allowFields)

      const response = await authorizedAxios.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response && response.data) {
        navigate(`/products/${response.data.product.productId}`);
      }
    } catch (error) {
      console.error("Unable to add product due to the following error: ", error);
    }
  };

  return addProduct;
};

export default useAddProduct;