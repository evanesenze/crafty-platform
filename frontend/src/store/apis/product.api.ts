import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';

export type Category = {
    name: string;
    slug: string;
    id: string;
};

export type Product = {
    category: Category;
    description: string;
    images: string[];
    name: string;
    price: number;
    slug: string;
    id: string;
};

export type CommonQueries = {};

export type GetProductsQueries = CommonQueries & {
    ownerId?: string;
};

export const productApi = createApi({
    reducerPath: 'product/api',
    baseQuery: getBaseQuery('products'),
    endpoints: ({ mutation, query }) => ({
        getProducts: query<Product[], GetProductsQueries>({
            query: (params) => ({
                url: '',
                params,
            }),
        }),
        getProduct: query<Product, any>({
            query: (id) => id,
        }),
        createProduct: mutation<any, any>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
        }),
        updateProduct: mutation<any, any>({
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
        }),
    }),
});

export const { useGetProductQuery, useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;
