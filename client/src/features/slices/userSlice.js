import {createSlice} from "@reduxjs/toolkit";

/* Create the slice for user */
const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    /* Update the user state */
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    /* Set the user state to null */
    clearUser: (state) => {
      state.user = null;
    }
  }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
