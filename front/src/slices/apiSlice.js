import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_VERSION, BASE_URL} from "../../constans.js";

const URL = BASE_URL + API_VERSION
// const URL = 'https://pokeapi.co/api/v2/'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    endpoints: () => ({}),
})
