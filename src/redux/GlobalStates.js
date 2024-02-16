import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { GetUrl } from "../BaseUrl";

export const handleGetCategories = createAsyncThunk(
  "global/handleGetCategories",
  async () => {
    try {
      const { data } = await GetUrl("category");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const handleGetSubCategories = createAsyncThunk(
  "global/handleGetSubCategories",
  async () => {
    try {
      const { data } = await GetUrl("subcategory");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const handleGetCountryAndCityList = createAsyncThunk(
  "global/handleGetCountryAndCityList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl("city");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  categoryLoading: false,
  subCategoryloading: false,
  categories: [],
  subCategories: [],
  error: null,
  countryList: [],
  cityList: [],
  countryAndCityLoading: false,
  selectedCity: "",
};

const GlobalStates = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleChangeCity: (state, { payload }) => {
      state.selectedCity = payload ?? "";
    },
  },
  extraReducers: (builder) => {
    // get categories
    builder
      .addCase(handleGetCategories.pending, (state, { payload }) => {
        state.categoryLoading = true;
      })
      .addCase(handleGetCategories.fulfilled, (state, { payload }) => {
        state.categoryLoading = false;
        state.categories = payload?.categories ?? [];
        state.error = null;
      })
      .addCase(handleGetCategories.rejected, (state, { payload }) => {
        state.categoryLoading = false;
        state.categories = [];
        state.error = payload ?? null;
      });

    // get sub categories
    builder
      .addCase(handleGetSubCategories.pending, (state, { payload }) => {
        state.subCategoryloading = true;
      })
      .addCase(handleGetSubCategories.fulfilled, (state, { payload }) => {
        state.subCategoryloading = false;
        state.subCategories = payload?.categories ?? [];
        state.error = null;
      })
      .addCase(handleGetSubCategories.rejected, (state, { payload }) => {
        state.subCategoryloading = false;
        state.subCategories = [];
        state.error = payload ?? null;
      });

    // get country & city
    builder
      .addCase(handleGetCountryAndCityList.pending, (state, { payload }) => {
        state.countryAndCityLoading = true;
      })
      .addCase(handleGetCountryAndCityList.fulfilled, (state, { payload }) => {
        state.countryAndCityLoading = false;
        state.countryList = payload?.countryList ?? [];
        state.cityList = payload?.cityList ?? [];
        state.selectedCity = payload?.cityList[0] ?? "";
        state.error = null;
      })
      .addCase(handleGetCountryAndCityList.rejected, (state, { payload }) => {
        state.countryAndCityLoading = false;
        state.countryList = [];
        state.cityList = [];
        state.selectedCity = "";
        state.error = payload ?? null;
      });
  },
});

export const { handleChangeCity } = GlobalStates.actions;

export default GlobalStates.reducer;
