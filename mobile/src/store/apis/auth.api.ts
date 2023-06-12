import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from '../../utils';
import { LoginDto, RefreshTokenDto, RegisterDto } from '../dto';
import { AuthSuccess } from '..';

export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: getBaseQuery('auth'),
    endpoints: ({ mutation }) => ({
        login: mutation<AuthSuccess, LoginDto>({
            query: (body) => ({
                method: 'POST',
                url: 'login',
                body,
            }),
        }),
        refreshToken: mutation<any, RefreshTokenDto>({
            query: (body) => ({
                method: 'POST',
                url: 'login/refresh',
                body,
            }),
        }),
        register: mutation<AuthSuccess, RegisterDto>({
            query: (body) => ({
                method: 'POST',
                url: 'register',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation, useRefreshTokenMutation, useRegisterMutation } = authApi;
