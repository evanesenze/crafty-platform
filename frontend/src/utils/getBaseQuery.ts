import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { SERVER_URL } from './config';
import { FetchBaseQueryArgs, ResponseHandler } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { RootState } from 'store';

const getPrepareHeaders =
    (withContentType: boolean): FetchBaseQueryArgs['prepareHeaders'] =>
    (headers, { getState }) => {
        const { accessToken } = (getState() as RootState).auth;
        withContentType && !headers.has('content-type') && headers.append('content-type', 'application/json');
        accessToken && headers.append('Authorization', `Bearer ${accessToken}`);
        return headers;
    };

const responseHandler: ResponseHandler = async (response) => {
    if (response.status === 401) {
        console.log(response);
    }
    return response.json();
};

export const getBaseQuery = (url?: string, withContentType = true) =>
    fetchBaseQuery({ baseUrl: SERVER_URL + (url ? url + '/' : ''), prepareHeaders: getPrepareHeaders(withContentType) });
