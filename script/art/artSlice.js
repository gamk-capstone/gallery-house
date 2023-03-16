import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * `fetchArtAsync` GETS data at Esty api
 */

export const fetchAllArtAsync = createAsyncThunk("artFetchAll", async () => {
  try {
    //GETs 100 listing_ids
    let { data } = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.etsy.com/v3/application/listings/active?limit=100&keywords=art,artwork,paintings&api_key=5wdviq8lfzumur7vsxlc7i3g`,
      { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
    );
    console.log("data", data)
    const listing_ids = data.results.map((l) => l.listing_id)
    const image_ids = data.results.map((l) => l.image_ids)
    console.log(listing_ids)
    console.log(image_ids)
    return data;
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
