import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./modules/auth/authSlice";
import invoiceReducer from "./modules/invoices/invoiceSlice";

import { authService } from "../services/auth";
import { invoiceService } from "../services/invoice";

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [invoiceService.reducerPath]: invoiceService.reducer,
    auth: authReducer,
    invoice: invoiceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(invoiceService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDipatch = typeof store.dispatch;
