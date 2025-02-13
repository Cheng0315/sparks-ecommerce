import { combineReducers } from '@reduxjs/toolkit';
import { userReducer, tokenReducer, cartReducer, guestCartReducer } from '../features/slices';

/* Root Reducer */
const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  cart: cartReducer,
  guestCart: guestCartReducer,

});

export default rootReducer;
