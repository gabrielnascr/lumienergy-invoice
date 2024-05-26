import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const invoiceService = createApi({
  reducerPath: "invoiceService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://lumienergy-backend:3000",
  }),
  endpoints: (builder) => ({
    getInvoices: builder.query<
      any,
      { customerNumber: string; customerName: string }
    >({
      query: ({ customerNumber, customerName }) =>
        `/invoices?customerNumber=${customerNumber}&customerName=${customerName}`,
    }),
    getInvoicesStats: builder.query<any, any>({
      query: () => `/invoices/statistics`,
    }),
  }),
});

export const { useGetInvoicesQuery } = invoiceService;
