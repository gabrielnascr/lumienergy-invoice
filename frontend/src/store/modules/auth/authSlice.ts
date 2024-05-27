import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services";
import toast from "react-hot-toast";

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      await api.post("/admin/register", {
        name,
        email,
        password,
      });
      toast.success("Registro efetuado com sucesso");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/admin/authenticate", {
        email,
        password,
      });
      const data = response.data;

      localStorage.setItem("@lumi:token", data.token);
      localStorage.setItem("@lumi:user", JSON.stringify(data));

      api.defaults.headers.authorization = data.token;
      toast.success("Login efetuado com sucesso");
      return data;
    } catch (error: any) {
      toast.error("Credenciais inválidas");
      return rejectWithValue(error.message);
    }
  }
);

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  const storedToken = localStorage.getItem("@lumi:token");
  const storedUser = localStorage.getItem("@lumi:user");
  if (storedUser && storedToken) {
    const user = JSON.parse(storedUser);
    api.defaults.headers.Authorization = `Bearer ${storedToken}`;
    return { token: storedToken, user };
  } else {
    return { token: null, user: null };
  }
});

interface User {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User;
  token: string | null;
  loading: boolean;
  authenticated: boolean;
  error?: any;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = {} as User;
      state.token = "";
      state.loading = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setUser: (state, action) => {
      state = {
        ...state,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.authenticated = !!action.payload.user;
        state.loading = false;
      })
      .addCase(loadUser.pending, (state, action) => {
        state.loading = true;
      });
  },
});
export const { logout, updateUser, setUser } = authSlice.actions;
export default authSlice.reducer;
