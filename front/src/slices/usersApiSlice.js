import authSlice from "./authSlice.js";
import {API_VERSION, BASE_URL} from "../../constans.js";
import {apiSlice} from "./apiSlice.js";

const URL = BASE_URL + API_VERSION

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${URL}/login`,
                method: 'POST',
                body: data
            })
        })
    })
})


export const { useLoginMutation } = usersApiSlice