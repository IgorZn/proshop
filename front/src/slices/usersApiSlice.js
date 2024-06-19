import {API_VERSION, BASE_URL} from "../../constans.js";
import {apiSlice} from "./apiSlice.js";

const URL = BASE_URL + API_VERSION

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        auth: builder.mutation({
            query: (data) => ({
                url: `${URL}/users/login`,
                method: 'POST',
                body: data,
            }),
            transformResponse: async (response, meta) => {
                return {...response, koo: 'hui'}
            },
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${URL}/users/logout`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${URL}/users`,
                method: 'POST',
                body: data
            })
        }),
        checkToken: builder.mutation({
            query: (data) => ({
                url: `${URL}/users/check-token`,
                method: 'POST',
                body: data
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${URL}/users/profile`,
                method: 'PUT',
                body: data
            })
        }),
    })
})


export const {
    useAuthMutation,
    useLogoutMutation,
    useRegisterMutation,
    useCheckTokenMutation,
    useProfileMutation
} = usersApiSlice