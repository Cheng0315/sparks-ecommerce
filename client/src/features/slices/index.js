/* exports all reducers and actions*/
import tokenReducer, { setAccessToken, clearAccessToken } from "./tokenSlice";
import userReducer, { setUser, clearUser } from "./userSlice";
import cartReducer, { addItemToCart, removeItemFromCart, updateItemQuantityInCart, clearCart } from "./cartSlice";

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
  updateItemQuantityInCart,
  clearCart
};
