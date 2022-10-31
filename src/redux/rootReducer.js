import { combineReducers } from '@reduxjs/toolkit';

 
import { cartReducer } from './cartSlice';
import { infoReducer } from './infoSlice';
import { locationReducer } from './locationSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  location: locationReducer,
  info: infoReducer
});

export default rootReducer;
