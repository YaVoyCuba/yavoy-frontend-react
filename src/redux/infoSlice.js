// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import apiManager from "../api/apiManager";

const infoSlice = createSlice({
  name: "info",
  initialState: {
    info:  await apiManager.getGeneralData(),
  },
  reducers: {
    getInfo: (state, action) => {},
  },
});

export const infoReducer = infoSlice.reducer;
