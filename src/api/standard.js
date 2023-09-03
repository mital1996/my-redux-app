import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const standardApi = createApi({
  reducerPath: "standardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://eims.kmsoft.in/standard",
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth.token || window.sessionStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStandard: builder.query({
      query: () => {
        return {
          url: "/allStandardGet",
          method: "GET",
        };
      },
    }),
    createStandard: builder.mutation({
      query: (body) => ({
        url: "/standardCreate",
        method: "POST",
        body,
      }),
    }),
    updateStandard: builder.mutation({
      query: (body) => ({
        url: `/standardUpdate/${body._id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteStandard: builder.mutation({
      query: (id) => ({
        url: `/standardDelete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateStandardMutation,
  useGetStandardQuery,
  useUpdateStandardMutation,
  useDeleteStandardMutation,
} = standardApi;
