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
 * `getWallsAysnc` GETS data at /api/user/:userId/walls and returns all walls for this user
 */
export const fetchWallsAsync = createAsyncThunk(
  "walls/fetchAll",
  async (userId) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/user/${userId}/walls`);
      console.log("walls/fetchAll", data)
      return data;
    } catch (error) {
      console.log(error);
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
    return data;
  }
);

export const galleryWallSlice = createSlice({
  name: "galleryWall",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEtsyImages.fulfilled, (state, { payload }) => payload);
    builder.addCase(fetchWallsAsync.fulfilled, (state, {payload}) => payload);
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
