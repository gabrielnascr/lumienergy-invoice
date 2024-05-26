import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./modules/auth/authSlice";
import invoiceReducer from "./modules/invoices/invoiceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDipatch = typeof store.dispatch;
