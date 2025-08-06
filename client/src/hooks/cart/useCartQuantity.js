import { useSelector } from "react-redux";

const useCartQuantity = () => {
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const guestCart = useSelector((state) => state.guestCart.guestCart);

  if (user) {
    return cart?.reduce((total, item) => total + item.quantity, 0);
  } else {
    return guestCart?.reduce((total, item) => total + item.quantity, 0);
  }
};

export default useCartQuantity;