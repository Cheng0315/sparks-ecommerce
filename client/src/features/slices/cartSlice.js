import {createSlice} from "@reduxjs/toolkit";

/* Create the slice for cart */
const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: JSON.parse(localStorage.getItem("cart")) || [] },
  reducers: {
    /* Add item to cart */
    addItemToCart: (state, action) => {
      const item = action.payload.item;
      const existingItem = state.cart.find(cartItem => cartItem?.productId === item.productId);

      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else {
        state.cart.push({ ...item });
      }
    },
    /* Remove item from cart */
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter(cartItem => cartItem.productId !== action.payload.item.productId);
    },
    updateItemInCart: (state, action) => {
      const existingItem = state.cart.find(item => item.productId === action.payload.productId);
      
      if (existingItem) existingItem.quantity = action.payload.quantity;
    },
    /* Set the cart*/
    setCart: (state, action) => {
      state.cart = action.payload.cart;
    },
    /* Clear the cart*/
    clearCart: state => {
      state.cart = [];
    },
  }
})

export const {addItemToCart, removeItemFromCart, updateItemInCart, setCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;