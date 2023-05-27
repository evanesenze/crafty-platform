import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';

export const productApi = createApi({
    reducerPath: 'product/api',
    baseQuery: getBaseQuery('products'),
    endpoints: ({ mutation, query }) => ({
        getProducts: query<any, any>({
            query: (params) => ({
                url: '',
                params,
            }),
        }),
        getProduct: query<any, any>({
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