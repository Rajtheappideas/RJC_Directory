import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeleteUrl, GetUrl, PostUrl } from "../BaseUrl";
import toast from "react-hot-toast";

export const handleGetReviews = createAsyncThunk(
  "review/handleGetReviews",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl("review", {
        headers: { Authorization: token },
      });
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      rejectWithValue(error?.response?.data);
    }
  }
);

export const handleAddAndEditReview = createAsyncThunk(
  "review/handleAddAndEditReview",
  async (
    { token, rating, comment, merchantId, signal },
    { rejectWithValue }
  ) => {
    signal.current = new AbortController();
    const formdata = new FormData();
    formdata.append("rating", rating);
    formdata.append("comment", comment);
    formdata.append("merchantId", merchantId);

    try {
      const { data } = await PostUrl("review", {
        data: formdata,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        signal: signal.current.signal,
      });
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      rejectWithValue(error?.response?.data);
    }
  }
);

export const handleDeleteReview = createAsyncThunk(
  "review/handleDeleteReview",
  async ({ token, id, signal }, { rejectWithValue }) => {
    signal.current = new AbortController();

    try {
      const { data } = await DeleteUrl(`review/${id}`, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        signal: signal.current.signal,
      });
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  loading: false,
  deleteLoading: false,
  addLoading: false,
  reviews: [],
  selectedReview: null,
};

const ReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    handleChangeSelectedReview: (state, { payload }) => {
      state.selectedReview = payload ?? null;
    },
  },
  extraReducers: (builder) => {
    // get reviews
    builder
      .addCase(handleGetReviews.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(handleGetReviews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reviews = payload?.reviews ?? [];
        state.error = null;
      })
      .addCase(handleGetReviews.rejected, (state, { payload }) => {
        state.loading = false;
        state.reviews = [];
        state.error = payload ?? null;
      });

    // add / edit reviews
    builder
      .addCase(handleAddAndEditReview.pending, (state, { payload }) => {
        state.addLoading = true;
      })
      .addCase(handleAddAndEditReview.fulfilled, (state, { payload, meta }) => {
        state.addLoading = false;
        state.reviews = state.reviews.map((review) => {
          if (review?.merchant?._id === meta?.arg?.merchantId) {
            return {
              ...review,
              rating: payload?.rating?.rating ?? review?.rating,
              comment: payload?.rating?.comment ?? review?.comment,
            };
          } else {
            return review;
          }
        });
        state.error = null;
      })
      .addCase(handleAddAndEditReview.rejected, (state, { payload }) => {
        state.addLoading = false;
        state.reviews = [];
        state.error = payload ?? null;
      });

    // delete review
    builder
      .addCase(handleDeleteReview.pending, (state, { payload }) => {
        state.deleteLoading = true;
      })
      .addCase(handleDeleteReview.fulfilled, (state, { payload }) => {
        state.deleteLoading = false;
        state.reviews = payload?.reviews ?? [];
        state.error = null;
      })
      .addCase(handleDeleteReview.rejected, (state, { payload }) => {
        state.deleteLoading = false;
        state.reviews = [];
        state.error = payload ?? null;
      });
  },
});

export const { handleChangeSelectedReview } = ReviewSlice.actions;

export default ReviewSlice.reducer;
