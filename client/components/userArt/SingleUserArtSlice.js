import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/**
 * This is where we keep all the state details for our single UserArt.
 */
/**
 * `fetchSingleUserArtAsync` GETS data at /api/art/user/:id
 */
export const fetchSingleUserArtAsync = createAsyncThunk(
  "fetchSingleUserArt",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/art/user/${id}`);
      return data;
    } catch (err) {
      next(err);
    }
  }
);

/**
 * `updateSingleUserArtAsync` PUTS (updates) data at /api/art/user/:userArtInfo.id
 */
export const updateSingleUserArtAsync = createAsyncThunk(
  "updateSingleUserArt",
  async (userArtInfo) => {
    try {
      const { data } = await axios.put(
        `/api/art/user/${userArtInfo.id}`,
        userArtInfo
      );
      return data;
    } catch (err) {
      next(err);
    }
  }
);

/**
 * `singleUserArtSlice` maintains the state of User Art.
 */
export const singleUserArtSlice = createSlice({
  name: "singleUserArt",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUserArtAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updateSingleUserArtAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleUserArt = (state) => state.singleUserArt;

export default singleUserArtSlice.reducer;
