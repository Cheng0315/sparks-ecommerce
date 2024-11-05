import { apiAxios } from "../../services/api/authAxios";
import { useEffect } from "react";

const useGetProduct = (productId, setViewedProduct) => {

  useEffect(() => {
    /* Create an instance of AbortController to cancel network request when needed */
    const controller = new AbortController();

    const getProduct = async () => {
      try {
        const response = await apiAxios.get(`/api/products/${productId}`, {
          signal: controller.signal
        });

        if (response) setViewedProduct(response.data.product);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.error('Error fetching user data:', error);
        }
      }
    };

    getProduct();

    return () => {
      /* Cancel ongoing network request when the component unmount */
      controller.abort();
    }
  }, [productId]);
};

export default useGetProduct;
