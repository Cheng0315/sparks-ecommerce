import {createSlice} from "@reduxjs/toolkit";

/* Create the slice for cart */
const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    /* Add item to cart */
    addItemToCart: (state, action) => {
      const item = action.payload.item;
      const existingItem = state.cart.find(cartItem => cartItem.productId === item.productId);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
    },
    /* Remove item from cart */
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter(cartItem => cartItem.productId !== action.payload.item.productId);
    },
    /* Update item quantity in cart*/
    updateItemQuantityInCart: (state, action) => {
      const updatedItem = action.payload.item;
      const existingItem = state.cart.find(cartItem => cartItem.productId === updatedItem.productId);

      if (existingItem) {
        existingItem.quantity = updatedItem.quantity;
      } 
    },
    /* Clear the cart*/
    clearCart: state => {
      state.cart = [];
    },
  }
})

export const {addItemToCart, removeItemFromCart, updateItemQuantityInCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;