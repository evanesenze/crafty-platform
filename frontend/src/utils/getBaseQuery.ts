import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { SERVER_URL } from './config';
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

const prepareHeaders: FetchBaseQueryArgs['prepareHeaders'] = (headers, api) => {
    return headers;
};

export const getBaseQuery = (url?: string) => fetchBaseQuery({ baseUrl: SERVER_URL + (url ? url + '/' : ''), prepareHeaders });
