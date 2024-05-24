import authSlice from "./authSlice.js";
import {API_VERSION, BASE_URL} from "../../constans.js";
import {apiSlice} from "./apiSlice.js";

const URL = BASE_URL + API_VERSION

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        auth: builder.mutation({
            query: (data) => ({
                url: `${URL}/users/login`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${URL}/users/logout`,
                method: 'POST',
                body: data
            })
        }),
    })
})


export const { useAuthMutation, useLogoutMutation } = usersApiSlice