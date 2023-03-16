import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSingleUserArtAsync = createAsyncThunk("fetchSingleUserArt", async (id) => {
  try {
    const { data } = await axios.get(`/api/art/user/${id}`);
    return data;
  } catch (err) {
    next (err)
  }
});

export const updateSingleUserArtAsync = createAsyncThunk("updateSingleUserArt", async (userArtInfo) => {
  try {
    const { data } = await axios.put(`/api/art/user/${userArtInfo.id}`,
    userArtInfo
    );
    return data;
  } catch (err) {
    next (err)
  }
});

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
    })
  }
});

export const selectSingleUserArt = (state) => state.singleUserArt;

export default singleUserArtSlice.reducer;