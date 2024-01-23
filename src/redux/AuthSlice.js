import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostUrl } from "../BaseUrl";
import toast from "react-hot-toast";

export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async ({ data, signal }, { rejectWithValue }) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const { data } = await PostUrl("register", { data: formData });
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  user: null,
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register
    builder.addCase(handleRegister.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(handleRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload?.user || null;
      state.token = payload?.token || null;
      state.error = null;
    });
    builder.addCase(handleRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = payload || null;
    });
  },
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer;
