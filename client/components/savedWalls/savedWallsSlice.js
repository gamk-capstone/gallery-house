import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * `fetchWallsAysnc` GETS data at /api/user/:userId and returns all walls for this user
 */
export const fetchWallsAsync = createAsyncThunk(
  "walls/fetchAll",
  async (userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/walls/user/${userId}`
      );
      console.log("walls/fetchAll", data);
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
  async ({ name, images, userId }) => {
    const { data } = await axios.post("http://localhost:8080/api/walls", {
      name,
      images,
      userId,
    });
    return data;
  }
);

/**
 * `deleteWallById DELETES data at api/walls based on wallId
 */
export const deleteWallById = createAsyncThunk(
  "walls/deleteWallById",
  async (wallId) => {
    const { data } = await axios.delete(`/api/walls/${wallId}`);
    return data;
  }
);

export const savedWallsSlice = createSlice({
  name: "savedWalls",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallsAsync.fulfilled, (state, { payload }) => payload)
      .addCase(saveWallAsync.fulfilled, (state, { payload }) => {
        state.push(payload);
      })
      .addCase(deleteWallById.fulfilled, (state, { payload }) =>
        state.filter((w) => w.id !== payload.id)
      );
  },
});

export const selectSavedWalls = (state) => {
  return state.savedWalls;
};

export default savedWallsSlice.reducer;
