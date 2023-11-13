// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LOCATION_DATA } from '../utils/constants.js';

const locationSlice = createSlice( {
    name:         'location',
    initialState: {
        province:      DEFAULT_LOCATION_DATA,
        municipality:  DEFAULT_LOCATION_DATA,
    },
    reducers:     {
        setProvince:         ( state, action ) => {
            state.province = action.payload;
        },
        setMunicipality:     ( state, action ) => {
            state.municipality = action.payload;
        },
    },
} );

export const locationReducer = locationSlice.reducer;
export const {
    setProvince, setMunicipality,
} = locationSlice.actions;
