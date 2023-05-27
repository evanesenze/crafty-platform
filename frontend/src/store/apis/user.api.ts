import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';

export const userApi = createApi({
    reducerPath: 'user/api',
    baseQuery: getBaseQuery('users'),
    endpoints: ({ mutation, query }) => ({
        toggleFavorite: mutation<any, any>({
            query: (body) => ({
                method: 'POST',
                url: 'profile/favorites/:id',
                body,
            }),
        }),
        getProfile: query<any, any>({
            query: () => 'profile',
        }),
        updateProfile: mutation<any, any>({
            query: (body) => ({
                method: 'PATCH',
                url: 'profile',
                body,
            }),
        }),
    }),
});

export const { useGetProfileQuery, useToggleFavoriteMutation, useUpdateProfileMutation } = userApi;
