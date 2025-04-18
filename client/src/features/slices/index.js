/* exports all reducers and actions*/
import tokenReducer, { setAccessToken, clearAccessToken } from "./tokenSlice";
import userReducer, { setUser, clearUser } from "./userSlice";
import cartReducer, { addItemToCart, removeItemFromCart, updateItemInCart, setCart, clearCart } from "./cartSlice";
import guestCartReducer, { addItemToGuestCart, removeItemFromGuestCart, updateItemInGuestCart, clearGuestCart } from "./guestCartSlice";

export {
  tokenReducer,
  setAccessToken,
  clearAccessToken,
  userReducer,
  setUser,
  clearUser,
  cartReducer,
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
  setCart,
  clearCart,
  guestCartReducer,
  addItemToGuestCart,
  removeItemFromGuestCart,
  updateItemInGuestCart,
  clearGuestCart,
};
