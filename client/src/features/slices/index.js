/* exports all reducers and actions*/
import tokenReducer, { setAccessToken, clearAccessToken } from "./tokenSlice";
import userReducer, { setUser, clearUser } from "./userSlice";
import cartReducer, { addItemToCart, removeItemFromCart, clearCart } from "./cartSlice";
import guestCartReducer, { addItemToGuestCart, removeItemFromGuestCart, clearGuestCart } from "./guestCartSlice";

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
  clearCart,
  guestCartReducer,
  addItemToGuestCart,
  removeItemFromGuestCart,
  clearGuestCart,
};
