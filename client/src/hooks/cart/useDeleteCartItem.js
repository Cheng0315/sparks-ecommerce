import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../features/slices";
import { authAxios } from "../../services/api/authAxios";
import { useSelector } from "react-redux";
import { removeItemFromGuestCart } from "../../features/slices";

const useDeleteCartItem = () => {
  const dispatch = useDispatch();
  const authorizedAxios = authAxios();
  const user = useSelector((state) => state.user.user);

  const deleteCartItem = async (productId) => {
    try {
      if (user) {
        const response = await authorizedAxios.delete(`/api/cart/items/${productId}`);
        
        if (response && response.status === 200) {
          dispatch(removeItemFromCart({ productId }));
          console.log("Successfully removed item from cart");
        }
      } else {
        dispatch(removeItemFromGuestCart({ productId }));
      }
    } catch (error) {
      console.error("Failed to remove item from cart ", error);
    }
    
  };

  return deleteCartItem;
};

export default useDeleteCartItem;