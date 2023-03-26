import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * `fetchEtsyImages` GETS data at Etsy (v3) API based on hue number and number of images.
 */
export const fetchEtsyImages = createAsyncThunk(
  "fetchEtsyImages",
  async (searchParams) => {
    try {
      const { data } = await axios.get(
        `/api/art/etsyArt/${searchParams.hueNum}/${searchParams.limit}`
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const galleryWallSlice = createSlice({
  name: "galleryWall",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEtsyImages.fulfilled, (state, { payload }) => payload)
      // .addCase(saveWallAsync.fulfilled, (state, { payload }) => {
      //   payload;
      // })
      // .addCase(fetchWallsAsync.fulfilled, (state, { payload }) => payload)
      // .addCase(deleteWallById.fulfilled, (state, { payload }) =>
      //   state.filter((w) => w.id !== payload.id)
      // );
  },
});

export const selectGalleryWall = (state) => {
  return state.galleryWall;
};

export default galleryWallSlice.reducer;
