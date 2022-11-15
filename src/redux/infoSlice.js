// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
 

const infoSlice = createSlice({
  name: "info",
  initialState: {
    info:  [],
  },
  reducers: {
    getInfo: (state, action) => {},
    setInfo: (state, action) => {
      state.info = action.payload;
    }

  },
});

export const infoReducer = infoSlice.reducer;

export const {setInfo} = infoSlice.actions;