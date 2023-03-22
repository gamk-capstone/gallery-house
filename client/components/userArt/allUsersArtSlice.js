import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * `fetchUserArtAsync` GETS data at /api/art/user
 */
export const fetchUserArtAsync = createAsyncThunk("fetchUserArt", async () => {
  try {
    const { data } = await axios.get("/api/art/user");
    return data;
  } catch (err) {
    next(err);
  }
});

/**
 * `createUserArtAsync` POSTS data at /api/art/user
 */
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
  });

  export const allUsersArtSlice = createSlice({
    name: "usersArt",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchUserArtAsync.fulfilled, (state, action) => {
        return action.payload;
      });
      builder.addCase(createUserArtAsync.fulfilled, (state, action) => {
        return action.payload;
      });
      builder.addCase(deleteUserArtAsync.fulfilled, (state, action) => {
        return {};
      })
    }
  });

  export const selectUserArt = (state) => state.userArt;

  export default allUsersArtSlice.reducer;
