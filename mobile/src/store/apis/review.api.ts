import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from '../../utils';
import { Product } from './product.api';
import { CommonQueries } from './order.api';

export type GetReviewsQueries = CommonQueries & {
  productId?: string;
};

export type Review = {
  id: string;
  rating: number;
  text: string;
  user?: any;
  product: Product;
};

export type CreateReview = {
  rating: number;
  text: string;
  product: string;
};

export const reviewApi = createApi({
  reducerPath: 'review/api',
  baseQuery: getBaseQuery('reviews'),
  tagTypes: ['Reviews'],
  endpoints: ({ mutation, query }) => ({
    getReviews: query<Review[], GetReviewsQueries>({
      query: (params) => ({
        url: '',
        params,
      }),
      providesTags: ['Reviews'],
    }),
    getReview: query<Review, string>({
      query: (id) => id,
    }),
    createReview: mutation<Review, CreateReview>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Reviews'],
    }),
    updateReview: mutation<any, any>({
      query: (body) => ({
        url: body.id,
        method: 'PATCH',
        body,
      }),
    }),
    deleteReview: mutation<any, any>({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateReviewMutation, useDeleteReviewMutation, useGetReviewQuery, useGetReviewsQuery, useUpdateReviewMutation } = reviewApi;
