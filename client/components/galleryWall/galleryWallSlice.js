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

/**
 * `saveWallAsync` POSTS data at /api/walls
 */
export const saveWallAsync = createAsyncThunk(
  "saveWall",
  async ({ images, userId }) => {
    const { data } = await axios.post("http://localhost:8080/api/walls", {
      images,
      userId,
    });
    console.log(data);
    return data;
  }
);

export const galleryWallSlice = createSlice({
  name: "galleryWall",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEtsyImages.fulfilled, (state, { payload }) => payload);
    builder.addCase(saveWallAsync.fulfilled, (state, { payload }) => {
      // state.push(payload);
      payload;
    });
  },
});

export const selectGalleryWall = (state) => {
  return state.galleryWall;
};

export default galleryWallSlice.reducer;
