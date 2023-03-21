import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserArtAsync = createAsyncThunk("fetchUserArt", async (id) => {
  try {
    const { data } = await axios.get(`/api/art/user/all/${id}`);
    return data;
  } catch (err) {
    next(err);
  }
});

export const createUserArtAsync = createAsyncThunk("addUserArt", async (userArtInfo) => {
  try {
    const { data } = await axios.post("/api/art/user", 
    userArtInfo
    );
    return data;
  } catch (err) {
    next (err)
  }
});

export const deleteUserArtAsync = createAsyncThunk(
  "deleteUserArt",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/art/user/${id}`);
      return data;
    } catch (err) {
      next(err);
    }
  });

  export const allUserArtSlice = createSlice({
    name: "userArt",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchUserArtAsync.fulfilled, (state, action) => {
        return action.payload;
      });
      builder.addCase(createUserArtAsync.fulfilled, (state, action) => {
       state.push(action.payload);
      });
      builder.addCase(deleteUserArtAsync.fulfilled, (state, action) => {
        return {};
      })
    }
  });

  export const selectUserArt = (state) => state.userArt;

  export default allUserArtSlice.reducer;
