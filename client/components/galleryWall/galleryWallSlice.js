import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEtsyImages = createAsyncThunk("fetchEtsyImages", async (searchParams) => {
  try {
    const { data } = await axios.get(`/api/art/etsyArt/${searchParams.hueNum}/${searchParams.limit}`
    );
    console.log(searchParams)
    console.log(data)
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