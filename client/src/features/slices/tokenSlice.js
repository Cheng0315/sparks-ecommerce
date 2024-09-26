import {createSlice} from "@reduxjs/toolkit";

/* Create the slice for access token */
export const tokenSlice = createSlice({
  name: "token",
  initialState: { token: null },
  reducers: {
    /* Update the token state */
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    /* Set token state to null */
    clearToken: (state) => {
      state.token = null;
    }
  }
})

export const {setToken, clearToken} = tokenSlice.actions;
export default tokenSlice.reducer;