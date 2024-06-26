import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_VERSION, BASE_URL} from "../../constans.js";
import Cookies from "js-cookie";

const URL = BASE_URL + API_VERSION
// const URL = 'https://pokeapi.co/api/v2/'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
        // credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userInfo?.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            if (!headers.get('Content-Type')) {
                headers.set('Content-Type', 'application/json')
            }
            return headers
        },
        credentials: "include"

    }),
    tagTypes: ['Products', 'Orders', 'User'],
    endpoints: () => ({}),
})
