import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services";
import { Invoice } from "../../../@types";

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (customerNumber: string) => {
    const response = await api.get(
      `/invoices?customerNumber=${customerNumber}`
    );
    return response.data;
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (invoiceId: string) => {
    await api.delete(`/invoices/${invoiceId}`);
    return invoiceId;
  }
);

interface InvoiceState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  error: null,
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInvoices.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchInvoices.fulfilled, (state, action) => {
      state.loading = false;
      state.invoices = action.payload;
    });
    builder.addCase(fetchInvoices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch invoices";
    });
    builder.addCase(deleteInvoice.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      );
    });
    builder.addCase(deleteInvoice.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default invoiceSlice.reducer;
