import {createSlice} from "@reduxjs/toolkit";

/* Create the slice for guest cart */
const guestCartSlice = createSlice({
  name: "guestCart",
  initialState: { guestCart: JSON.parse(localStorage.getItem("guestCart")) || [] },
  reducers: {
    /* Add item to guest cart */
    addItemToGuestCart: (state, action) => {
      const item = action.payload.item;
      const existingItem = state.guestCart.find(cartItem => cartItem?.productId === item.productId);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.guestCart.push({ ...item });
      }
    },
    /* Remove item from guest cart */
    removeItemFromGuestCart: (state, action) => {
      state.guestCart = state.guestCart.filter(cartItem => cartItem.productId !== action.payload.item.productId);
    },
    /* Update item in guest cart */
    updateItemInGuestCart: (state, action) => {
      const existingItem = state.guestCart.find(item => item.productId === action.payload.productId);
      if (existingItem) existingItem.quantity = action.payload.quantity;
    },
    /* Clear the guest cart*/
    clearGuestCart: state => {
      state.guestCart = [];
    },
  }
})

export const {addItemToGuestCart, removeItemFromGuestCart, updateItemInGuestCart, clearGuestCart} = guestCartSlice.actions;
export default guestCartSlice.reducer;