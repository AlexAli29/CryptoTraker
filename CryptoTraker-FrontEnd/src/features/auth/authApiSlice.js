import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'api/Auth/login',
        method: 'POST',
        body: { ...credentials },
        responseHandler: (response) => response.text()
      })
    }),
    register: builder.mutation({
      query: credentials => ({
        url: 'api/Auth/register',
        method: 'POST',
        body: { ...credentials },
        responseHandler: (response) => response.text(),
      })
    }),
    refresh: builder.mutation({
      query: credentials => ({
        url: 'api/Auth/refresh',
        method: 'POST',
        body: { ...credentials },
        responseHandler: (response) => response.text(),
      })
    }),
    getToken: builder.mutation({
      query: credentials => ({
        url: 'api/Auth/gettoken',
        method: 'POST',
        body: { ...credentials },
        responseHandler: (response) => response.text(),
      })
    }),
    getUser: builder.mutation({
      query: () => ({
        url: 'api/Auth/getuser',
        method: 'GET',
      })
    }),
    addCoin: builder.mutation({
      query: ({ ticker, userId }) => ({
        url: `api/Coins/add/${ticker}`,
        method: 'POST',
        body: { userId }

      })
    }),
    removeCoin: builder.mutation({
      query: ({ ticker, userId }) => ({
        url: `api/Coins/remove/${ticker}`,
        method: 'POST',
        body: { userId }

      })
    }),
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useGetTokenMutation,
  useGetUserMutation,
  useAddCoinMutation,
  useRemoveCoinMutation

} = authApiSlice