import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';

export const orderApi = createApi({
    reducerPath: 'order/api',
    baseQuery: getBaseQuery('orders'),
    endpoints: ({ mutation, query }) => ({
        getOrders: query<any, any>({
            query: (params) => ({
                url: '',
                params,
            }),
        }),
        getOrder: query<any, any>({
            query: (id) => id,
        }),
        createOrder: mutation<any, any>({
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
        getOrderItem: query<any, any>({
            query: ({ orderId, id }) => `${id}/items/${orderId}`,
        }),
        updateOrderItem: mutation<any, any>({
            query: (body) => ({
                url: `${body.orderId}/items/${body.id}`,
                method: 'PATCH',
                body,
            }),
        }),
        deleteOrderItem: mutation<any, any>({
            query: ({ orderId, id }) => ({
                url: `${id}/items/${orderId}`,
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
