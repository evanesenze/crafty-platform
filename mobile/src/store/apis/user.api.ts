import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from '../../utils';
import { Product } from './product.api';
import { OrderItem } from './order.api';

export type UserProfile = {
  role: string;
  name: string;
  email: string;
  basket: OrderItem[];
  phone: string;
  avatar: string;
  favorites: Product[];
  id: string;
};

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: getBaseQuery('users'),
  tagTypes: ['Profile'],
  endpoints: ({ mutation, query }) => ({
    toggleFavorite: mutation<void, string>({
      query: (id) => ({
        method: 'POST',
        url: `profile/favorites/${id}`,
      }),
      invalidatesTags: ['Profile'],
    }),
    addToBasket: mutation<void, string>({
      query: (id) => ({
        method: 'POST',
        url: `profile/basket/${id}`,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteFromBasket: mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `profile/basket/${id}`,
      }),
      invalidatesTags: ['Profile'],
    }),
    getProfile: query<UserProfile, void>({
      query: () => 'profile',
      providesTags: ['Profile'],
    }),
    updateProfile: mutation<any, Partial<UserProfile>>({
      query: (body) => ({
        method: 'PATCH',
        url: 'profile',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useDeleteFromBasketMutation, useAddToBasketMutation, useToggleFavoriteMutation, useUpdateProfileMutation } =
  userApi;
