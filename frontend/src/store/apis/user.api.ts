import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';

export type UserProfile = {
    role: string;
    name: string;
    email: string;
    basket: any[];
    phone: string;
    avatar: string;
    favorites: any[];
    id: string;
};

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
        getProfile: query<UserProfile, void>({
            query: () => 'profile',
        }),
        updateProfile: mutation<any, Partial<UserProfile>>({
            query: (body) => ({
                method: 'PATCH',
                url: 'profile',
                body,
            }),
        }),
    }),
});

export const { useGetProfileQuery, useToggleFavoriteMutation, useUpdateProfileMutation } = userApi;
