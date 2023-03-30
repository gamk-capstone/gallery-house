import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/**
 * This is where we keep all the state details for our savedWallSlice.
 */

/**
 * `fetchSingleWallAysnc` GETS data at /api/user/:userId/:wallId and returns a single instance of wall for this user
 */
export const fetchSingleWallAsync = createAsyncThunk(
  "wall/fetchOne",
  async ({ userId, wallId }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/walls/${wallId}/user/${userId}`
      );
      if (data === "") {
        alert("Oops, this wall does not exist.");
        return thunkAPI.rejectWithValue("Oops, this wall does not exist.");
      } else {
        return data[0];
      }
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * `savedWallSlice` maintains the state of SavedWall.
 */
export const savedWallSlice = createSlice({
  name: "savedWall",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleWallAsync.fulfilled, (state, { payload }) => payload)
      .addCase(fetchSingleWallAsync.rejected, (state, action) => {
        return action.error.message;
      });
  },
});

export const selectSavedWall = (state) => {
  return state.savedWall;
};

export default savedWallSlice.reducer;
