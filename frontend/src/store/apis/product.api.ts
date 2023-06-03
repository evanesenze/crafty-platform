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
    categoryId?: string;
    q?: string;
};

export const productApi = createApi({
    reducerPath: 'product/api',
    baseQuery: getBaseQuery('products'),
    endpoints: ({ mutation, query }) => ({
        getProducts: query<Product[], GetProductsQueries>({
            query: (params) => {
                console.log('params', params);
                return {
                    url: '',
                    params,
                };
            },
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

export const {
    useGetProductQuery,
    useGetProductBySlugQuery,
    useGetProductsQuery,
    useGetRecommendationsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
