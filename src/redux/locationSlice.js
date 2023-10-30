// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice( {
    name:         'location',
    initialState: {
        province:      { label: '', value: { id: 0 } },
        municipality:  { label: '', value: { id: 0 } },
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
