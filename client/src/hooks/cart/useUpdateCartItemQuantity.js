import { useDispatch } from "react-redux";
import { updateItemInCart } from "../../features/slices";
import { authAxios } from "../../services/api/authAxios";

const useUpdateCartItemQuantity = () => {
  const dispatch = useDispatch();
  const authorizedAxios = authAxios();

  const updateCartItemQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantity

    try {
      const response = await authorizedAxios.patch(`/api/cart`, { productId, quantity: newQuantity });
      
      if (response && response.data) {
        dispatch(updateItemInCart( response.data.item ));
        console.log("Successfully updated item quantity");
       }
    } catch (error) {
      console.error("Failed to update quantity: ", error);
    }
  };

  return updateCartItemQuantity;
};

export default useUpdateCartItemQuantity;