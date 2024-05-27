import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./modules/auth/authSlice";
import invoiceReducer from "./modules/invoices/invoiceSlice";
import modalReducer from "./modules/modal/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDipatch = typeof store.dispatch;
