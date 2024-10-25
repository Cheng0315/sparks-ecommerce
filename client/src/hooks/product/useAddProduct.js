import { authAxios } from "../../services/api/authAxios";

/* custom hook for adding product */
const useAddProduct = () => {
  const authorizedAxios = authAxios();

  const addProduct = async (values ) => {
    try {
      const { productImage, ...objectDetails } = values;
      const response = await authorizedAxios.post("/api/products/validate-details", objectDetails);

      const formData = new FormData();
      formData.append("image", productImage);
      formData.append("productToken", response.data.productToken);

      if (response) {
        const responseData = await authorizedAxios.post("/api/products/add-product", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (responseData) {
          console.log(responseData.data);
        }
      }
    } catch (error) {
      console.error("Unable to add product due to the following error: ", error);
    }
  };

  return addProduct;
};

export default useAddProduct;