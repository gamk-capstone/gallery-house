import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEtsyImages = createAsyncThunk("updateEmptyFrameCount", async (searchParams) => {
  try {
    const { data } = await axios.get(`/api/etsyArt/${searchParams.hueNum}`, 
    searchParams
    );
    return data;
  } catch (err) {
    console.error(err);
  }
});

export const galleryWallSlice = createSlice({
  name: "galleryWall",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEtsyImages.fulfilled, (state, action) => {
      return action.payload
    });
  }
});

export const selectGalleryWall = (state) => {
  return state.galleryWall;
};

export default galleryWallSlice.reducer;