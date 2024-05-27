import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/admin/authenticate",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
    register: builder.mutation<
      any,
      { name: string; email: string; password: string }
    >({
      query: ({ email, password, name }) => ({
        url: "/admin/register",
        method: "POST",
        body: {
          email,
          password,
          name,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authService;
