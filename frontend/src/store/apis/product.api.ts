import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';
import { Category, CommonQueries, UpdateEntity } from '..';

export type Product = {
    category: Category | string;
    description: string;
    images: string[];
    name: string;
    price: number;
    slug: string;
    owner: string;
    id: string;
};

export type GetProductsQueries = CommonQueries & {
    ownerId?: string;
    categoryId?: string;
    q?: string;
};

export const productApi = createApi({
    reducerPath: 'product/api',
    baseQuery: getBaseQuery('products', false),
    tagTypes: ['Products'],
    endpoints: ({ mutation, query }) => ({
        getProducts: query<Product[], GetProductsQueries>({
            query: (params) => ({
                url: '',
                params,
            }),
            providesTags: ['Products'],
        }),
        getProduct: query<Product, string>({
            query: (id) => id,
        }),
        getRecommendations: query<Product[], void>({
            query: () => 'recommendations',
        }),
        getProductBySlug: query<Product, string>({
            query: (slug) => `with-slug/${slug}`,
        }),
        createProduct: mutation<Product, FormData>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: mutation<Product, UpdateEntity<Product>>({
            query: (body) => ({
                url: body.id,
                method: 'PATCH',
                body,
            }),
        }),
        deleteProduct: mutation<any, any>({
            query: (id) => ({
                url: id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useGetProductQuery,
    useGetProductBySlugQuery,
    useGetProductsQuery,
    useGetRecommendationsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
