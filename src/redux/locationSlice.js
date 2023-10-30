// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice( {
    name:         'location',
    initialState: {
        location:      { locationName: '', locationId: 0, provinceName: '', provinceId: 0 },
        locationHouse: { 'locationName': '', 'locationId': 0, 'provinceId': 0 },
    },
    reducers:     {
        setLocationCommerce: ( state, action ) => {
            state.location = action.payload;
        },
        setLocationHouse:    ( state, action ) => {
            let location = {};
            location.locationName = action.payload.locationName;
            location.locationId = action.payload.locationId;
            location.provinceId = action.payload.provinceId;
            state.locationHouse = location;

        },
    },
} );

export const locationReducer = locationSlice.reducer;
export const {
    setLocationCommerce, setLocationHouse,
} = locationSlice.actions;
