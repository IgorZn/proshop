import { apiSlice } from "./apiSlice.js";

// export const pokemonApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getPokemon: builder.query({
//             query: (name) => `pokemon/${name}`,
//             keepUnusedDataFor: 5
//         }),
//     }),
// })
//
// export const { useGetPokemonQuery } = pokemonApiSlice

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (name) => `products`,
            keepUnusedDataFor: 5
        }),
    }),
})

export const { useGetProductsQuery } = productsApiSlice