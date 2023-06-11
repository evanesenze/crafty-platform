import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';
import { Product } from './product.api';
import { UpdateEntity } from '..';

export type OrderItem = {
    id: string;
    quantity: number;
    price: number;
    order: string;
    product: Product;
};

export type Order = {
    id: string;
    status: string;
    items: OrderItem[];
    comment?: string;
    address: string;
    buyer: {};
    seller: {};
};

export type CreateOrderDto = {
    items: string[];
    comment?: string;
    address: string;
    buyer: string;
    seller: string;
    discount: number;
};

export type CommonQueries = {};

export type GetOrdersQueries = CommonQueries & {
    buyerId?: string;
    sellerId?: string;
};

export const orderApi = createApi({
    reducerPath: 'order/api',
    baseQuery: getBaseQuery('orders'),
    endpoints: ({ mutation, query }) => ({
        getOrders: query<Order[], GetOrdersQueries>({
            query: (params) => ({
                url: '',
                params,
            }),
        }),
        getOrder: query<Order, any>({
            query: (id) => id,
        }),
        createOrder: mutation<Order, CreateOrderDto>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
        }),
        updateOrder: mutation<any, any>({
            query: (body) => ({
                url: body.id,
                method: 'PATCH',
                body,
            }),
        }),
        deleteOrder: mutation<any, any>({
            query: (id) => ({
                url: id,
                method: 'DELETE',
            }),
        }),
        getOrderItem: query<OrderItem, string>({
            query: (id) => `items/${id}`,
        }),
        updateOrderItem: mutation<OrderItem, UpdateEntity<OrderItem>>({
            query: (body) => ({
                url: `items/${body.id}`,
                method: 'PATCH',
                body,
            }),
        }),
        deleteOrderItem: mutation<any, string>({
            query: (id) => ({
                url: `items/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetOrderQuery,
    useCreateOrderMutation,
    useDeleteOrderItemMutation,
    useDeleteOrderMutation,
    useGetOrderItemQuery,
    useGetOrdersQuery,
    useUpdateOrderItemMutation,
    useUpdateOrderMutation,
} = orderApi;
