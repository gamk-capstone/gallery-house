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
  "addUserArt",
  async (formData) => {
    try {
      const { data } = await axios.post("/api/art/uploadfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        return data;
      }
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
      builder.addCase(fetchUserArtAsync.fulfilled, (state, action) => {
        return action.payload;
      });
      builder.addCase(createUserArtAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      });
      builder.addCase(deleteUserArtAsync.fulfilled, (state, action) => {
        const newState = state.filter((usersArt) => usersArt.id !== action.payload.id);
      return newState;
      })
    }
  });

export const selectUserArt = (state) => state.usersArt;

export default allUsersArtSlice.reducer;
