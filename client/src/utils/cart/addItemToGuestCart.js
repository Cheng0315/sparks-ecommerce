import { getGuestCart, setGuestCart } from "./index.js";

const addItemToGuestCart = (item) => {
  const guestCart = [...getGuestCart()];
  const existingItem = guestCart.find(cartItem => cartItem.productId === item.productId);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    guestCart.push(item);
  }

  setGuestCart(guestCart);
  console.log(getGuestCart());
};

export default addItemToGuestCart;