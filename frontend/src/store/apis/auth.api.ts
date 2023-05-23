import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';

export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: getBaseQuery('auth'),
    endpoints: ({ mutation }) => ({
        login: mutation<any, any>({
            query: (body) => ({
                method: 'POST',
                url: 'login',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
