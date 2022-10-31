// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import apiManager from "../api/apiManager";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: {'locationName':"Habana Vieja",'locationId':50},
  },
  reducers: {
    setLocation: (state, action) => {
       let location = {};
       location.locationName = action.payload.locationName;
       location.locationId = action.payload.locationId;

       state.location = location;
    },
  },
});

export const locationReducer = locationSlice.reducer;
export const {
  setLocation
} = locationSlice.actions;
