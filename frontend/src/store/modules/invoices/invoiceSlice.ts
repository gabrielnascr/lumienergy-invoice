import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (customerNumber: string) => {}
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: { invoices: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInvoices.pending, (state) => {});
    builder.addCase(fetchInvoices.fulfilled, (state, action) => {});
    builder.addCase(fetchInvoices.rejected, (state, action) => {});
  },
});

export default invoiceSlice.reducer;
