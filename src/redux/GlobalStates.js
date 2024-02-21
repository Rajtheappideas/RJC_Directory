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
      const { data } = await GetUrl("country");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      rejectWithValue(error?.response?.data);
    }
  }
);

export const handleGetAutocompleteName = createAsyncThunk(
  "global/handleGetAutocompleteName",
  async ({ query }, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl(`autocomplete?name=${query}`);
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
  stateList: [],
  countryAndCityLoading: false,
  selectedCity: "",
  selectedState: "",
  merchantName: [],
  autoCompleteLoading: false,
};

const GlobalStates = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleChangeCity: (state, { payload }) => {
      state.selectedCity = payload ?? "";
    },
    handleChangeState: (state, { payload }) => {
      state.selectedState = payload ?? "";
    },
    handleClearMerchantName: (state, { payload }) => {
      state.merchantName = payload;
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
        state.countryList = payload?.data ?? [];
        for (const key in payload?.data) {
          payload?.data[key].states.map((s) => state.cityList.push(s.cities));
        }
        for (const key in payload?.data) {
          payload?.data[key].states.map((s) => state.stateList.push(s.state));
        }
        state.error = null;
      })
      .addCase(handleGetCountryAndCityList.rejected, (state, { payload }) => {
        state.countryAndCityLoading = false;
        state.countryList = [];
        state.cityList = [];
        state.stateList = [];
        state.selectedCity = "";
        state.error = payload ?? null;
      });

    // get auto complete merchant name
    builder
      .addCase(handleGetAutocompleteName.pending, (state, { payload }) => {
        state.autoCompleteLoading = true;
      })
      .addCase(handleGetAutocompleteName.fulfilled, (state, { payload }) => {
        state.autoCompleteLoading = false;
        state.merchantName = payload?.merchantName ?? [];
        state.error = null;
      })
      .addCase(handleGetAutocompleteName.rejected, (state, { payload }) => {
        state.autoCompleteLoading = false;
        state.merchantName = [];
        state.error = payload ?? null;
      });
  },
});

export const { handleChangeCity, handleChangeState, handleClearMerchantName } =
  GlobalStates.actions;

export default GlobalStates.reducer;
