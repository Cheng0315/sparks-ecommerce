import { combineReducers } from '@reduxjs/toolkit';
import { userReducer, tokenReducer, cartReducer } from '../features/slices';

/* Root Reducer */
const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  cart: cartReducer,
});

export default rootReducer;
