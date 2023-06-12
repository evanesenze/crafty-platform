import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CommonUser = {
    id: string;
    email: string;
};

export type AuthSliceState = {
    isError: boolean;
    isAuth: boolean;
    accessToken?: string;
    refreshToken?: string;
    user?: CommonUser;
};

export type AuthSuccess = {
    accessToken: string;
    refreshToken: string;
    user: CommonUser;
};

const initialState: AuthSliceState = {
    isAuth: false,
    isError: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        authByCredentials: (state, action: PayloadAction<AuthSuccess>) => {
            const { accessToken, refreshToken, user } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.user = user;
            state.isAuth = true;
            state.isError = false;
        },
        resetAuth: (state, action: PayloadAction<Partial<AuthSliceState>>) => {
            const { accessToken, isAuth, isError, refreshToken, user } = action.payload;
            state.accessToken = accessToken ?? undefined;
            state.refreshToken = refreshToken ?? undefined;
            state.user = user ?? undefined;
            state.isAuth = isAuth ?? false;
            state.isError = isError ?? false;
        },
    },
});
