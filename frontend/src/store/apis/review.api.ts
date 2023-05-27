import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';

export const reviewApi = createApi({
    reducerPath: 'review/api',
    baseQuery: getBaseQuery('reviews'),
    endpoints: ({ mutation, query }) => ({
        getReviews: query<any, any>({
            query: (params) => ({
                url: '',
                params,
            }),
        }),
        getReview: query<any, any>({
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
