import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://eims.kmsoft.in" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/Login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
