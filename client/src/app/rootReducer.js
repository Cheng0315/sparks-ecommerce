import { combineReducers } from '@reduxjs/toolkit';
import { userReducer, tokenReducer } from '../features/slices';

const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer
});

export default rootReducer;
