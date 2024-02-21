import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeleteUrl, GetUrl, PostUrl } from "../BaseUrl";
import toast from "react-hot-toast";

export const handleGetListOfMerchants = createAsyncThunk(
  "merchant/handleGetListOfMerchants",
  async (
    {
      token,
      page,
      limit,
      name,
      city,
      country,
      category,
      state,
      subcategory,
      MyPreferences,
      sortBy,
      rating,
    },
    { rejectWithValue }
  ) => {
    const formData = new FormData();

    formData.append("rating", JSON.stringify(rating));
    formData.append("page", page ?? 1);
    formData.append("limit", limit ?? 10);
    formData.append("name", name ?? "");
    formData.append("city", city === "All" ? " " : city ?? "");
    formData.append("category", category ?? "");
    formData.append("country", country ?? "");
    formData.append("state", state ?? "");
    formData.append("subcategory", subcategory ?? "");
    formData.append("MyPreferences", MyPreferences ?? "off");
    formData.append("sortBy", sortBy ?? "newest");

    try {
      const { data } = await PostUrl("merchant", {
        data: formData,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
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

export const handleGetNearByBusinessMerchantList = createAsyncThunk(
  "merchant/handleGetNearByBusinessMerchantList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl(`business/merchant`, {
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

export const handleGetLatestMerchantList = createAsyncThunk(
  "merchant/handleGetLatestMerchantList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl(`latest/merchant`);
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      rejectWithValue(error?.response?.data);
    }
  }
);

export const handleGetMerchantById = createAsyncThunk(
  "merchant/handleGetMerchantById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl(`merchant/${id}`);
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      rejectWithValue(error?.response?.data);
    }
  }
);

export const handleGetBestOffers = createAsyncThunk(
  "merchant/handleGetBestOffers",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl("offers", {
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

export const handleGetFavs = createAsyncThunk(
  "merchant/handleGetFavs",
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl("favourite", {
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

export const handleAddFav = createAsyncThunk(
  "merchant/handleAddFav",
  async ({ token, id, signal }, { rejectWithValue }) => {
    signal.current = new AbortController();
    try {
      const { data } = await PostUrl(`favourite/add/${id}`, {
        headers: { Authorization: token },
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

export const handleRemoveFav = createAsyncThunk(
  "merchant/handleRemoveFav",
  async ({ token, id, signal }, { rejectWithValue }) => {
    signal.current = new AbortController();
    try {
      const { data } = await DeleteUrl(`favourite/remove/${id}`, {
        headers: { Authorization: token },
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
  bestOfferLoading: false,
  countryAndCityLoading: false,
  merchantGetLoading: false,
  merchants: [],
  allData: null,
  bestOffers: [],
  favGetloading: false,
  favAddLoading: false,
  favRemoveLoading: false,
  favourites: [],
  merchantDetails: null,
  merchantByIdLoading: false,
  latestMerchantList: [],
  nearByBusinessMerchantList: [],
  latestMerchantLoading: false,
  nearByBusinessMerchantLoading: false,
  searchParams: {
    name: "",
    page: "1",
    limit: "10",
    city: "",
    country: "",
    state: "",
    category: "",
    subcategory: "",
    MyPreferences: "off",
    sortBy: "ratingHighToLow",
    rating: [],
  },
};

const MerchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    handleChangeSearchParams: (state, { payload }) => {
      let params = {};
      for (const key in state.searchParams) {
        if (Object.keys(payload).includes(key)) {
          params[key] = payload[key];
        } else {
          params[key] = state.searchParams[key];
        }
      }
      state.searchParams = params;
    },
  },
  extraReducers: (builder) => {
    // get merchats list
    builder
      .addCase(handleGetListOfMerchants.pending, (state, { payload }) => {
        state.merchantGetLoading = true;
      })
      .addCase(handleGetListOfMerchants.fulfilled, (state, { payload }) => {
        state.merchantGetLoading = false;
        state.merchants = payload?.merchants ?? [];
        state.allData = payload ?? null;
        state.error = null;
      })
      .addCase(handleGetListOfMerchants.rejected, (state, { payload }) => {
        state.merchantGetLoading = false;
        state.merchants = [];
        state.allData = null;
        state.error = payload ?? null;
      });

    // get near by business merchats list
    builder
      .addCase(handleGetNearByBusinessMerchantList.pending, (state, { payload }) => {
        state.nearByBusinessMerchantLoading = true;
      })
      .addCase(handleGetNearByBusinessMerchantList.fulfilled, (state, { payload }) => {
        state.nearByBusinessMerchantLoading = false;
        state.nearByBusinessMerchantList = payload?.merchants ?? [];
        state.error = null;
      })
      .addCase(handleGetNearByBusinessMerchantList.rejected, (state, { payload }) => {
        state.nearByBusinessMerchantLoading = false;
        state.nearByBusinessMerchantList = [];
        state.error = payload ?? null;
      });

    // get latest merchats list
    builder
      .addCase(handleGetLatestMerchantList.pending, (state, { payload }) => {
        state.latestMerchantLoading = true;
      })
      .addCase(handleGetLatestMerchantList.fulfilled, (state, { payload }) => {
        state.latestMerchantLoading = false;
        state.latestMerchantList = payload?.merchants ?? [];
        state.error = null;
      })
      .addCase(handleGetLatestMerchantList.rejected, (state, { payload }) => {
        state.latestMerchantLoading = false;
        state.merchants = [];
        state.error = payload ?? null;
      });

    // get merchat by id
    builder
      .addCase(handleGetMerchantById.pending, (state, { payload }) => {
        state.merchantByIdLoading = true;
      })
      .addCase(handleGetMerchantById.fulfilled, (state, { payload }) => {
        state.merchantByIdLoading = false;
        state.merchantDetails =
          { ...payload?.merchant, reviews: payload?.reviews } ?? null;
        state.error = null;
      })
      .addCase(handleGetMerchantById.rejected, (state, { payload }) => {
        state.merchantByIdLoading = false;
        state.merchantDetails = null;
        state.error = payload ?? null;
      });

    // get best offers
    builder
      .addCase(handleGetBestOffers.pending, (state, { payload }) => {
        state.bestOfferLoading = true;
      })
      .addCase(handleGetBestOffers.fulfilled, (state, { payload }) => {
        state.bestOfferLoading = false;
        state.bestOffers = payload?.merchants ?? [];
        state.error = null;
      })
      .addCase(handleGetBestOffers.rejected, (state, { payload }) => {
        state.bestOfferLoading = false;
        state.bestOffers = [];
        state.error = payload ?? null;
      });

    // get favs
    builder
      .addCase(handleGetFavs.pending, (state, { payload }) => {
        state.favGetloading = true;
      })
      .addCase(handleGetFavs.fulfilled, (state, { payload }) => {
        state.favGetloading = false;
        state.favourites = payload?.favourites ?? [];
        state.error = null;
      })
      .addCase(handleGetFavs.rejected, (state, { payload }) => {
        state.favGetloading = false;
        state.favourites = [];
        state.error = payload ?? null;
      });

    // add  fav
    builder
      .addCase(handleAddFav.pending, (state, { payload }) => {
        state.favAddLoading = true;
      })
      .addCase(handleAddFav.fulfilled, (state, { payload, meta }) => {
        state.favAddLoading = false;
        state.merchants = state.merchants.map((merchant) => {
          if (merchant?._id === meta.arg?.id) {
            return { ...merchant, isFavourite: true };
          } else {
            return merchant;
          }
        });
        state.favourites = state.favourites.map((favourite) => {
          if (favourite?._id === meta.arg?.id) {
            return { ...favourite, isFavourite: true };
          } else {
            return favourite;
          }
        });
        state.bestOffers = state.bestOffers.map((offer) => {
          if (offer?._id === meta.arg?.id) {
            return { ...offer, isFavourite: true };
          } else {
            return offer;
          }
        });

        state.error = null;
      })
      .addCase(handleAddFav.rejected, (state, { payload }) => {
        state.favAddLoading = false;
        state.favourites = [];
        state.error = payload ?? null;
      });

    // delete fav
    builder
      .addCase(handleRemoveFav.pending, (state, { payload }) => {
        state.favRemoveLoading = true;
      })
      .addCase(handleRemoveFav.fulfilled, (state, { payload, meta }) => {
        state.favRemoveLoading = false;
        state.merchants = state.merchants.map((merchant) => {
          if (merchant?._id === meta.arg?.id) {
            return { ...merchant, isFavourite: false };
          } else {
            return merchant;
          }
        });
        state.bestOffers = state.bestOffers.map((offer) => {
          if (offer?._id === meta.arg?.id) {
            return { ...offer, isFavourite: false };
          } else {
            return offer;
          }
        });
        state.favourites = state.favourites.filter((favourite) => {
          return favourite?._id !== meta.arg?.id;
        });

        state.error = null;
      })
      .addCase(handleRemoveFav.rejected, (state, { payload }) => {
        state.favRemoveLoading = false;
        state.favourites = [];
        state.error = payload ?? null;
      });
  },
});

export const { handleChangeSearchParams } = MerchantSlice.actions;

export default MerchantSlice.reducer;
