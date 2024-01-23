import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { GetUrl } from "../BaseUrl";

export const handleGetTestimonial = createAsyncThunk(
  "cms/handleGetTestimonial",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl("testimonial");
      return data;
    } catch (error) {
      toast.error(error?.message);
      return rejectWithValue(error?.message);
    }
  }
);

const initialState = {
  testimonial: {
    data: [],
    loading: false,
    error: null,
  },
};

const CmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get testimonial
    builder.addCase(handleGetTestimonial.pending, (state, { payload }) => {
      state.testimonial.loading = true;
    });
    builder.addCase(handleGetTestimonial.fulfilled, (state, { payload }) => {
      state.testimonial.loading = false;
      state.testimonial.data = payload?.testimonial || [];
      state.testimonial.error = null;
    });
    builder.addCase(handleGetTestimonial.rejected, (state, { payload }) => {
      state.testimonial.loading = false;
      state.testimonial.data = [];
      state.testimonial.error = payload || null;
    });
  },
});

export const {} = CmsSlice.actions;

export default CmsSlice.reducer;
