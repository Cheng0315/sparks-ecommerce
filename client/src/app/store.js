import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice.js";

/* Redux store */
const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store;
