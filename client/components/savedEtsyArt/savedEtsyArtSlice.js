import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


/**
 * `fetchSavedEtsyArtAsync` GETS data at /api/art/etsy/saved/:id
 */
export const fetchSavedEtsyArtAsync = createAsyncThunk("fetchAllSavedEtsyArt", async (id) => {
  try {
    const { data } = await axios.get(`/api/art/etsy/saved/${id}`);
    return data;
  } catch (err) {
    next(err);
  }
});

/**
 * `createSavedEtsyArtAsync` POSTS data at /api/art/etsy/saved
 */
export const createSavedEtsyArtAsync = createAsyncThunk("addSavedEtsyArt", async (etsyArtInfo) => {
  try {
    const { data } = await axios.post("/api/art/etsy/saved", 
    etsyArtInfo
    );
    return data;
  } catch (err) {
    next (err)
  }
});

/**
 * `deleteEtsySavedArtAsync` DELETES data at /api/art/etsy/saved/:id 
 */
export const deleteSavedEtsyArtAsync = createAsyncThunk(
  "deleteSavedEtsyArt",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/art/etsy/saved/${id}`);
      return data;
    } catch (err) {
      next(err);
    }
  });

export const deleteSavedEtsyArtByUrlAsync = createAsyncThunk("deleteSavedEtsyArtByName",
  async ({ userId, etsyId }) => {
    try {
      const { data } = await axios.delete(`api/art/etsy/saved/${userId}/${etsyId}`);
      return data;
    } catch (err) {
      next (err)
    }
  })

export const savedEtsyArtSlice = createSlice({
  name: "savedEtsyArt",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSavedEtsyArtAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createSavedEtsyArtAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(deleteSavedEtsyArtAsync.fulfilled, (state, action) => {
      const newState = state.filter((savedEtsyArt) => savedEtsyArt.id !== action.payload.id);
      return newState;
    });
    builder.addCase(deleteSavedEtsyArtByUrlAsync.fulfilled, (state, action) => {
      const newState = state.filter((savedEtsyArt) => savedEtsyArt.imageUrl !== action.payload.imageUrl);
      return newState;
    })
  }
});

export const selectSavedEtsyArt = (state) => state.savedEtsyArt;

export default savedEtsyArtSlice.reducer;