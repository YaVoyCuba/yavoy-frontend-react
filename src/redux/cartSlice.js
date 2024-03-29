// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({

  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart?.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity =   itemInCart.quantity + action.payload.quantity;
      } else {
        state.cart.push({ ...action.payload, quantity: action.payload.quantity });

      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart?.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart?.find((item) => item.id === action.payload);
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        // TODO: buscar como llamar removeItem
        state.cart = state.cart?.filter( ( item ) => item.id !== action.payload );
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart?.filter( ( item ) => item.id !== action.payload );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
