import {createSlice} from "@reduxjs/toolkit";

/* Initial state for auth slice */
const initialState = {
  user: null,
  token: null
}

/* Create the slice for authentication */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* User login/registration reducer */
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    /* User logout reducer */
    clearAuth: (state, action) => {
      state.user = null;
      state.token = null;
    }
  }
})

export const {setAuth, clearAuth} = authSlice.actions;
export default authSlice.reducer;