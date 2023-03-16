import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * `fetchArtAsync` GETS data at Esty api
 */

export const fetchOneHundredListingIdsAsync = createAsyncThunk("artFetchAll", async () => {
  try {
    //GETs 100 listing_ids
    let { data } = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.etsy.com/v3/application/listings/active?limit=100&keywords=art,artwork,paintings&api_key=5wdviq8lfzumur7vsxlc7i3g`,
      { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
    );
    const listing_ids = data.results.map((l) => l.listing_id)
    console.log(listing_ids)
    console.log(data.results)
    return data.results;
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
      .addCase(fetchOneHundredListingIdsAsync.fulfilled, (state, { payload }) => payload)
      .addCase(fetchOneHundredListingIdsAsync.rejected, (state, action) => {
        return action.error.message;
      });
  },
});

export const selectArt = (state) => state.art;

export default artSlice.reducer;
