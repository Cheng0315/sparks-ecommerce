import { useSelector } from "react-redux";

const useCartQuantity = () => {
  const user = useSelector((state) => state.user.user);

  if (user) {
    const cart = useSelector((state) => state.cart.cart);
    return cart.reduce((total, item) => total + item.quantity, 0);
  } else {
    const guestCart = useSelector((state) => state.guestCart.guestCart);
    return guestCart.reduce((total, item) => total + item.quantity, 0);
  }
};

export default useCartQuantity;