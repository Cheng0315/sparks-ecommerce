import { authAxios } from "../../services/api/authAxios";

/* custom hook for adding product */
const useAddProduct = () => {
  const authorizedAxios = authAxios();

  const addProduct = async (values ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("condition", values.condition);
      formData.append("price", values.price);
      formData.append("stockQuantity", values.stockQuantity);
      formData.append("categoryId", values.categoryId);
      formData.append("productImage", values.productImage);

      const response = await authorizedAxios.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Unable to add product due to the following error: ", error);
    }
  };

  return addProduct;
};

export default useAddProduct;