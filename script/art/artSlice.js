import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * `fetchArtAsync` GETS data at Esty api
 */

export const fetchAllArtAsync = createAsyncThunk("artFetchAll", async () => {
  try {
    let { data } =
      await axios.get(`https://openapi.etsy.com/v2/listings/active?includes=Images&keywords=artwork,art,painting&api_key=5wdviq8lfzumur7vsxlc7i3g`);
    console.log(data[0])
    return data[0];
  } catch (error) {
    console.log(error);
  }
});

/**
 * `artSlice`
 */

export const artSlice = createSlice({
  name: "art",
  initialState: [],
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArtAsync.fulfilled, (state, { payload }) => payload)
      .addCase(fetchAllArtAsync.rejected, (state, action) => {
        return action.error.message;
      });
  },
});

export const selectArt = (state) => state.art;

export default artSlice.reducer;
