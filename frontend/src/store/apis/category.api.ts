import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';

export const categoryApi = createApi({
    reducerPath: 'category/api',
    baseQuery: getBaseQuery('categories'),
    endpoints: ({ mutation, query }) => ({
        getCategories: query<any, any>({
            query: (params) => ({
                url: '',
                params,
            }),
        }),
        getCategory: query<any, any>({
            query: (id) => id,
        }),
        createCategory: mutation<any, any>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
        }),
        updateCategory: mutation<any, any>({
            query: (body) => ({
                url: body.id,
                method: 'PATCH',
                body,
            }),
        }),
        deleteCategory: mutation<any, any>({
            query: (id) => ({
                url: id,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetCategoryQuery, useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } =
    categoryApi;
