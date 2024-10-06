import {createSlice} from "@reduxjs/toolkit";

/* Create the slice for access token */
const tokenSlice = createSlice({
  name: "token",
  initialState: { accessToken: null },
  reducers: {
    /* Update the token state */
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    /* Set token state to null */
    clearAccessToken: (state) => {
      state.accessToken = null;
    }
  }
})

export const {setAccessToken, clearAccessToken} = tokenSlice.actions;
export default tokenSlice.reducer;