import { useDispatch } from "react-redux";
import { updateItemInCart } from "../../features/slices";
import { authAxios } from "../../services/api/authAxios";
import { useSelector } from "react-redux";
import { updateItemInGuestCart } from "../../features/slices";

const useUpdateCartItemQuantity = () => {
  const dispatch = useDispatch();
  const authorizedAxios = authAxios();
  const user = useSelector((state) => state.user.user);

  const updateCartItemQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantity
    
    if (user) {
      try {
        const response = await authorizedAxios.patch(`/api/cart/items/${productId}`, { quantity: newQuantity });
        
        if (response && response.data.item) {
          dispatch(updateItemInCart( response.data.item ));
          console.log("Successfully updated item quantity");
         }
         
      } catch (error) {
        console.error("Failed to update quantity: ", error);
      }
    } else {
      dispatch(updateItemInGuestCart({ productId, quantity: newQuantity }));
    }
  };

  return updateCartItemQuantity;
};

export default useUpdateCartItemQuantity;