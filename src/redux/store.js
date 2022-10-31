import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import rootReducer from "./rootReducer";

// export const store = configureStore({
//   reducer: cartReducer

// })

export const store = configureStore({
  reducer: rootReducer,
});


 


 