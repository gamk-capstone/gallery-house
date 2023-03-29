import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * `fetchUserArtAsync` GETS data at /api/art/user
 */
export const fetchUserArtAsync = createAsyncThunk(
  "fetchUserArt",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/art/user/all/${id}`);
      return data;
    } catch (err) {
      next(err);
    }
  }
);

/**
 * `createUserArtAsync` POSTS data at /api/art/user
 */
export const createUserArtAsync = createAsyncThunk(
  "createUserArt",
  async (formData) => {
    try {
      const { data } = await axios.post("/api/art/uploadfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (err) {
      next(err);
    }
  }
);

/**
 * `deleteUserArtAsync` DELETES data at /api/art/user/:id
 */
export const deleteUserArtAsync = createAsyncThunk(
  "deleteUserArt",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/art/user/${id}`);
      return data;
    } catch (err) {
      next(err);
    }
  }
);

export const allUsersArtSlice = createSlice({
  name: "usersArt",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserArtAsync.fulfilled, (state, { payload }) => payload)
      .addCase(createUserArtAsync.fulfilled, (state, { payload }) => {
        state.push(payload);
      })
      .addCase(deleteUserArtAsync.fulfilled, (state, { payload }) => 
        state.filter((a) => a.id !== payload.id)
      );
  },
});

export const selectUserArt = (state) => state.usersArt;

export default allUsersArtSlice.reducer;
