import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';

export type Category = {
    id: string;
    name: string;
    slug: string;
};

export const categoryApi = createApi({
    reducerPath: 'category/api',
    baseQuery: getBaseQuery('categories'),
    endpoints: ({ mutation, query }) => ({
        getCategories: query<Category[], any>({
            query: (params) => ({
                url: '',
                params,
            }),
        }),
        getCategory: query<Category, any>({
            query: (id) => id,
        }),
        getCategoryBySlug: query<Category, string>({
            query: (slug) => `with-slug/${slug}`,
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

export const {
    useGetCategoryQuery,
    useGetCategoryBySlugQuery,
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
