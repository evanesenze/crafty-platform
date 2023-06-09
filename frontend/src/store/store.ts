import { configureStore } from '@reduxjs/toolkit';
import { authSlice, cartSlice } from './slices';
import { authApi, categoryApi, orderApi, productApi, reviewApi, userApi } from './apis';

const apis = [authApi, categoryApi, orderApi, productApi, reviewApi, userApi];

export const store = configureStore({
    reducer: {
        [cartSlice.name]: cartSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (d) => d().concat(...apis.map((api) => api.middleware)),
});

export type RootState = ReturnType<typeof store.getState>;

export type UpdateEntity<T extends { id: string }> = Partial<T> & Pick<T, 'id'>;
