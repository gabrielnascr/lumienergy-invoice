import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {}
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {});
    builder.addCase(login.fulfilled, (state, action) => {});
    builder.addCase(login.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
