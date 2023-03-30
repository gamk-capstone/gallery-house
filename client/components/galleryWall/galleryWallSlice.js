import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/**
 * This is where we keep all the state details for our GalleryWall.
 */

/**
 * `fetchEtsyImages` is an async thunk that GETS data at Etsy (v3) API based on hue number and number of images.
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

/**
 * `galleryWallSlice` maintains the state of GalleryWall.
 */
export const galleryWallSlice = createSlice({
  name: "galleryWall",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEtsyImages.fulfilled, (state, { payload }) => payload)
  },
});

export const selectGalleryWall = (state) => {
  return state.galleryWall;
};

export default galleryWallSlice.reducer;
