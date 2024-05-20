import authSlice from "./authSlice.js";
import {API_VERSION, BASE_URL} from "../../constans.js";

const URL = BASE_URL + API_VERSION

export const usersApiSlice = authSlice.injectEndpoints({
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