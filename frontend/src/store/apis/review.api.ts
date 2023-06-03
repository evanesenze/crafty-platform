import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';
import { Product } from './product.api';

export type CommonQueries = {};

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

export const reviewApi = createApi({
    reducerPath: 'review/api',
    baseQuery: getBaseQuery('reviews'),
    endpoints: ({ mutation, query }) => ({
        getReviews: query<Review[], GetReviewsQueries>({
            query: (params) => ({
                url: '',
                params,
            }),
        }),
        getReview: query<Review, string>({
            query: (id) => id,
        }),
        createReview: mutation<any, any>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
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
