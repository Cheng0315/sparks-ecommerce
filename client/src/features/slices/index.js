/* exports all reducers and actions*/
import tokenReducer, { setToken, clearToken } from "./tokenSlice";
import userReducer, { setUser, clearUser } from "./userSlice";

export {
  tokenReducer,
  setToken,
  clearToken,
  userReducer,
  setUser,
  clearUser
};
