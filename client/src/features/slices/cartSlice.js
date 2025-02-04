import {createSlice} from "@reduxjs/toolkit";

/* Create the slice for cart */
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    /* Add item to cart */
    addItemToCart: (state, action) => {
      const newItem = action.payload.item;
      const existingItem = state.items.find(item => item.productId === newItem.productId);

      if (existingItem) {
        existingItem.stockQuantity += newItem.stockQuantity;
      } else {
        state.items.push(newItem);
      }
    },
    /* Remove item from cart */
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item.productId !== action.payload.item.productId);
    },
    /* Update item quantity in cart*/
    updateItemQuantityInCart: (state, action) => {
      const updatedItem = action.payload.item;
      const existingItem = state.items.find(item => item.productId === updatedItem.productId);

      if (existingItem) {
        existingItem.quantity = updatedItem.quantity;
      } 
    },
    /* Clear the cart*/
    clearCart: state => {
      state.items = [];
    },
  }
})

export const {addItemToCart, removeItemFromCart, updateItemQuantityInCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;