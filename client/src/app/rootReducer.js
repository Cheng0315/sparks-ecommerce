import { combineReducers } from '@reduxjs/toolkit';
import { userReducer, tokenReducer } from '../features/slices';

/* Root Reducer */
const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer
});

export default rootReducer;
