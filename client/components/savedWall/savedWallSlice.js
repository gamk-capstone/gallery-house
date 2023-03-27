import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * `fetchSingleWallAysnc` GETS data at /api/user/:userId/:wallId and returns a single instance of wall for this user
 */
export const fetchSingleWallAsync = createAsyncThunk(
  "wall/fetchOne",
  async ({ userId, wallId }) => {
    try {
      console.log("WALLID", wallId);
      const { data } = await axios.get(
        `http://localhost:8080/api/walls/${wallId}/user/${userId}`
      );
      if (data === "") {
        alert("Oops, this wall does not exist.");
        return thunkAPI.rejectWithValue("Oops, this wall does not exist.");
      } else {
        console.log(data[0]);
        return data[0];
      }
    } catch (error) {
      console.log(error);
    }
  }
);

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
