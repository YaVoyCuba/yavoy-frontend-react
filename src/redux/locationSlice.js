// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LOCATION_DATA } from '../utils/constants.js';

const locationSlice = createSlice( {
    name:         'location',
    initialState: {
        province:     DEFAULT_LOCATION_DATA,
        municipality: DEFAULT_LOCATION_DATA,
    },
    reducers:     {
        setProvinceStorage:     ( state, action ) => {
            state.province = action.payload;
        },
        setMunicipalityStorage: ( state, action ) => {
            state.municipality = action.payload;
        },
    },
} );

export const locationReducer = locationSlice.reducer;
export const {
    setProvinceStorage, setMunicipalityStorage,
} = locationSlice.actions;
