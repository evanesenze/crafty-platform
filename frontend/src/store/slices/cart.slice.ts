import { createSlice } from '@reduxjs/toolkit';

export type CartSliceState = {};

const initialState: CartSliceState = {};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
});
