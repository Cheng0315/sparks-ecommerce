/* exports all reducers and actions*/
import tokenReducer, { setAccessToken, clearAccessToken } from "./tokenSlice";
import userReducer, { setUser, clearUser } from "./userSlice";

export {
  tokenReducer,
  setAccessToken,
  clearAccessToken,
  userReducer,
  setUser,
  clearUser
};
