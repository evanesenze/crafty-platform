import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './slices';
import { authApi } from './apis';

export const store = configureStore({
    reducer: {
        [cartSlice.name]: cartSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (d) => d().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
