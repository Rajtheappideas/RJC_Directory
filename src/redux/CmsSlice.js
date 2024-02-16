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
  testimonials: [],
  testimonialLoading: false,
  error: null,
  offerBanners: [],
  offerBannerLoading: false,
};

const CmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get testimonial
    builder.addCase(handleGetTestimonial.pending, (state, { payload }) => {
      state.testimonialLoading = true;
    });
    builder.addCase(handleGetTestimonial.fulfilled, (state, { payload }) => {
      state.testimonialLoading = false;
      state.testimonials = payload?.testimonial || [];
      state.error = null;
    });
    builder.addCase(handleGetTestimonial.rejected, (state, { payload }) => {
      state.testimonialLoading = false;
      state.testimonials = [];
      state.error = payload || null;
    });

    // get offer banner
    builder.addCase(handleGetOfferBanner.pending, (state, { payload }) => {
      state.offerBannerLoading = true;
    });
    builder.addCase(handleGetOfferBanner.fulfilled, (state, { payload }) => {
      state.offerBannerLoading = false;
      state.offerBanners = payload?.banner || [];
      state.error = null;
    });
    builder.addCase(handleGetOfferBanner.rejected, (state, { payload }) => {
      state.offerBannerLoading = false;
      state.offerBanners = [];
      state.error = payload || null;
    });
  },
});

export const {} = CmsSlice.actions;

export default CmsSlice.reducer;
