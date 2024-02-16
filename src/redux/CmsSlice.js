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

export const handleGetOfferBanner = createAsyncThunk(
  "cms/handleGetOfferBanner",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl("offer/banner");
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
  offerBanner: {
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

    // get offer banner
    builder.addCase(handleGetOfferBanner.pending, (state, { payload }) => {
      state.offerBanner.loading = true;
    });
    builder.addCase(handleGetOfferBanner.fulfilled, (state, { payload }) => {
      state.offerBanner.loading = false;
      state.offerBanner.data = payload?.banner || [];
      state.offerBanner.error = null;
    });
    builder.addCase(handleGetOfferBanner.rejected, (state, { payload }) => {
      state.offerBanner.loading = false;
      state.offerBanner.data = [];
      state.offerBanner.error = payload || null;
    });
  },
});

export const {} = CmsSlice.actions;

export default CmsSlice.reducer;
