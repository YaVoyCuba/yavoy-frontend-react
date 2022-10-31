// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import apiManager from "../api/apiManager";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: {'locationName':"",'locationId':0,'provinceId':0},
  },
  reducers: {
    setLocation: (state, action) => {
       let location = {};
       location.locationName = action.payload.locationName;
       location.locationId = action.payload.locationId;
       location.provinceId = action.payload.provinceId
       state.location = location;
       
    },
  },
});

export const locationReducer = locationSlice.reducer;
export const {
  setLocation
} = locationSlice.actions;
