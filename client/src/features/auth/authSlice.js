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
    /* User registration reducer*/
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  }
})

export const {setAuth} = authSlice.actions;
export default authSlice.reducer;