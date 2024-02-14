import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostUrl } from "../BaseUrl";
import toast from "react-hot-toast";

export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async ({ data, signal }, { rejectWithValue }) => {
    signal.current = new AbortController();
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const { data } = await PostUrl("register", {
        data: formData,
        signal: signal.current.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleSignin = createAsyncThunk(
  "auth/handleSignin",
  async ({ phone, password, signal }, { rejectWithValue }) => {
    signal.current = new AbortController();

    const formData = new FormData();

    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("fcm", "test");

    try {
      const { data } = await PostUrl("login", {
        data: formData,
        signal: signal.current.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleGetSigninOTP = createAsyncThunk(
  "auth/handleGetSigninOTP",
  async ({ phone, signal }, { rejectWithValue }) => {
    signal.current = new AbortController();

    const formData = new FormData();

    formData.append("phone", phone);

    try {
      const { data } = await PostUrl("send-otp", {
        data: formData,
        signal: signal.current.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleVerifySigninOTP = createAsyncThunk(
  "auth/handleVerifySigninOTP",
  async ({ phone, otp, signal }, { rejectWithValue }) => {
    signal.current = new AbortController();

    const formData = new FormData();

    formData.append("phone", phone);
    formData.append("otp", otp);

    try {
      const { data } = await PostUrl("verify-otp", {
        data: formData,
        signal: signal.current.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleForgotPassword = createAsyncThunk(
  "auth/handleForgotPassword",
  async ({ phone, signal }, { rejectWithValue }) => {
    signal.current = new AbortController();

    const formData = new FormData();
    formData.append("phone", phone);
    try {
      const { data } = await PostUrl("forgot-password", {
        data: formData,
        signal: signal.current.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        return toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleVerifyOtp = createAsyncThunk(
  "auth/handleVerifyOtp",
  async ({ otp, phone, signal }, { rejectWithValue }) => {
    signal.current = new AbortController();
    const formdata = new FormData();
    formdata.append("otp", otp);
    formdata.append("phone", phone);
    try {
      const { data } = await PostUrl("verify-forgot-otp", {
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleResetPassword = createAsyncThunk(
  "auth/handleResetPassword",
  async ({ token, password, confirmPassword, signal }, { rejectWithValue }) => {
    signal.current = new AbortController();

    const formdata = new FormData();
    formdata.append("token", token);
    formdata.append("password", password);
    formdata.append("confirmPassword", confirmPassword);

    try {
      const { data } = await PostUrl("reset-password", {
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
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
  reducers: {
    handleLogout: (state, { payload }) => {
      state.loading = true;
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(handleRegister.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(handleRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload?.user ?? null;
      state.token = payload?.token ?? null;
      state.error = null;
    });
    builder.addCase(handleRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = payload ?? null;
    });

    // login
    builder.addCase(handleSignin.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(handleSignin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload?.user ?? null;
      state.token = payload?.token ?? null;
      state.error = null;
    });
    builder.addCase(handleSignin.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = payload ?? null;
    });

    // login with otp
    builder.addCase(handleGetSigninOTP.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(handleGetSigninOTP.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = null;
    });
    builder.addCase(handleGetSigninOTP.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = payload ?? null;
    });

    // verify login otp
    builder.addCase(handleVerifySigninOTP.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(handleVerifySigninOTP.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload?.user ?? null;
      state.token = payload?.token ?? null;
      state.error = null;
    });
    builder.addCase(handleVerifySigninOTP.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = payload ?? null;
    });

    // forgot-password
    builder
      .addCase(handleForgotPassword.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(handleForgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(handleForgotPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? null;
        state.user = null;
        state.token = null;
      });

    // otp verify
    builder
      .addCase(handleVerifyOtp.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(handleVerifyOtp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.token = payload?.token;
        state.error = null;
      })
      .addCase(handleVerifyOtp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? null;
        state.user = null;
        state.token = null;
      });

    //reset password
    builder
      .addCase(handleResetPassword.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(handleResetPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(handleResetPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? null;
        state.user = null;
        state.token = null;
      });
  },
});

export const { handleLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
